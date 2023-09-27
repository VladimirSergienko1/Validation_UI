import {createEffect, createStore, sample} from "effector";
import usersList from "../../pages/admin/users/UsersList.jsx";
import {createGate} from "effector-react";


export const fetchUsersFx = createEffect(async () => {
    const response = await fetch('http://localhost:3002/users');
    return new Promise(resolve => {
        setTimeout( ()=>(
            resolve(response.json())
        ),300)
    })
})

export const $usersList = createStore([]).on(fetchUsersFx.doneData, (_, users) => users);

export const UsersGate = createGate()

sample({
    clock: UsersGate.open,
    target: fetchUsersFx
})