import {createEvent, createStore, sample} from "effector";
import {createEffect} from "effector";
import {api} from "../api/axios.js";
import {createGate} from "effector-react";

export const AppGate = createGate()

export const checkAuthFx = createEffect()
    .use(async () => (await api().get('/auth/status')).data)

export const loginFx = createEffect(async ({login, password}) => {
    return (await api().post('/auth/login', {login, password})).data
});

export const $authStatus = createStore(false)
$authStatus.watch(state => console.log('AUTH STATUS', state))

export const logoutEv = createEvent()

$authStatus.on(loginFx.doneData, () => true);
$authStatus.on(checkAuthFx.doneData, (state, payload) => payload?.authorized ?? false)
$authStatus.on(logoutEv, () => false)

sample({
    clock: AppGate.open,
    target: checkAuthFx
})

export const loginEv = createEvent()

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

$user.on(loginFx.doneData, (_, data) => data?.user);
$user.on(checkAuthFx.doneData, (_, data) => data?.user)