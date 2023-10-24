import {createEffect, createStore, sample} from "effector";
import {createGate} from "effector-react";
import {api} from "../../../api/axios.js";
import {TasksGate} from "../../tasksModel/index.js";


export const fetchUsersFx = createEffect(async () => {
    return (await api().get('/users')).data
})

export const updateUserFx = createEffect(async (user) => {
    user['is_admin'] = user.isAdmin
    return (await api().patch(`/users/update/${user.id}`, user)).data
});

export const createUserFx = createEffect(async (user) => {
    user['is_admin'] = user.isAdmin
    return (await api().post('users/create', user)).data
});


export const $usersList = createStore([])
    .on(fetchUsersFx.doneData, (_, users) => users)
    .on(updateUserFx.doneData, (users, updatedUser) =>
    users.map(user => user.id === updatedUser.id ? updatedUser : user)
    ).on(createUserFx.doneData, (users, newUser) => [...users, newUser]
);

export const UsersGate = createGate()

sample({
    clock: [UsersGate.open, TasksGate.open],
    target: fetchUsersFx
})