import {createEvent, createStore, sample} from "effector";
import {createEffect} from "effector";
import {api} from "../api/axios.js";
import {createGate} from "effector-react";

export const AppGate = createGate()
export const LoginGate = createGate()

export const checkAuthFx = createEffect()
    .use(async () => (await api().get('/auth/status')).data)

export const loginFx = createEffect(async ({login, password}) => {
    return (await api().post('/auth/login', {login, password})).data
});

export const logOutFx = createEffect()
    .use(async ()=> (await api().post('/auth/logout')).data)

export const $authStatus = createStore(false)

$authStatus.on(loginFx.doneData, () => true);
$authStatus.on(checkAuthFx.doneData, (state, payload) => payload?.authorized ?? false)
$authStatus.on(logOutFx.doneData, (_, data) => data)

sample({
    clock: [AppGate.status, LoginGate.status],
    filter: (status) => status,
    target: checkAuthFx
})

export const loginEv = createEvent()
export const logoutEv = createEvent()

export const $user = createStore(null);

sample({
    clock: logoutEv,
    target: logOutFx
})

sample({
    clock: loginEv,
    target: loginFx
})

$user.on(loginFx.doneData, (_, data) => data?.user);
$user.on(checkAuthFx.doneData, (_, data) => data?.user)