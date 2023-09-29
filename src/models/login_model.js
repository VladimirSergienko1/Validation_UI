import {createEffect, createEvent, createStore, sample} from 'effector';
import {api} from "../api/axios.js";

export const loginEv = createEvent()

export const loginFx = createEffect(async ({login, password}) => {
    return (await api().post('/auth/login', {login, password})).data
});

export const $user = createStore(null);

export const logOutFx = createEffect(async()=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            return resolve (true)
        },500)
    })
})

sample({
    clock: loginEv,
    target: loginFx
})

$user.on(loginFx.doneData, (_, data) => data.user);

