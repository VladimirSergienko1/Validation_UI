import {createEffect, createEvent, createStore, sample} from 'effector';
import {createGate, useGate} from "effector-react";
import {$authStatus} from "./auth_model.js";

export const submitForm = createEvent();

/*export const $formData = createStore(

    {
        login: '',
        password: '',
    }
).on(submitForm, (state, payload) => {
    console.log('Payload:', payload);
    return {
        login: '',
        password: '',
    };
})*/

export const LoginGate = createGate();

/*export const loginFx = createEffect(async ({login, password}) => {
    return new Promise((resolve, reject) => setTimeout(()=>{
        if (login && password){
            return resolve(true)
        }
        else {
            return reject(true)
        }
    },2000))
})*/
export const loginFx = createEffect(async ({login, password}) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:3002/users?login=${login}&password=${password}`);
                const users = await response.json();
                if (users.length === 0) throw new Error('Invalid credentials');
                resolve(users[0]);
            } catch (error) {
                reject(error);
            }
        }, 500);
    });
});

export const $user = createStore(null);

export const setAdminStatus = createEvent();
$user.on(setAdminStatus, (_, newValue) => newValue);


export const logOutFx = createEffect(async()=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            return resolve (true)
        },500)
    })
})

sample({
    clock: LoginGate.open,
    target: loginFx
})
$user.on(loginFx.doneData, (_, user) => user);
/*
$user.reset(logOutFx);*/
