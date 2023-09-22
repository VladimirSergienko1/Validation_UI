import {createEffect, createEvent, createStore, sample} from 'effector';
import {createGate, useGate} from "effector-react";

export const submitForm = createEvent();

export const $formData = createStore(

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
})

export const LoginGate = createGate();

export const loginFx = createEffect(async ({login, password}) => {
    return new Promise((resolve, reject) => setTimeout(()=>{
        if (login && password){
            return resolve(true)
        }
        else {
            return reject(true)
        }
    },2000))
})

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
