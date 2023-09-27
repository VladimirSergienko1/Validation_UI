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

export const updateUserFx = createEffect(async (user) => {
    const response = await fetch(`http://localhost:3002/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    return response.json();
});

export const createUserFx = createEffect(async (user) => {
    const response = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return response.json();
});


export const $usersList = createStore([])
    .on(fetchUsersFx.doneData, (_, users) => users)
    .on(updateUserFx.doneData, (users, updatedUser) =>
    users.map(user => user.id === updatedUser.id ? updatedUser : user)
    ).on(createUserFx.doneData, (users, newUser) => [...users, newUser]
);

export const UsersGate = createGate()

sample({
    clock: UsersGate.open,
    target: fetchUsersFx
})