import {createEvent, createStore} from "effector";
import {loginFx} from "./login_model.js";
import cookies from 'js-cookie'

export const $authStatus = createStore(!!cookies.get('access_token'))
$authStatus.watch(state => console.log('AUTH STATUS', state))

export const logoutEv = createEvent()

$authStatus.on(loginFx.doneData, () => true);
$authStatus.on(logoutEv, () => false)
