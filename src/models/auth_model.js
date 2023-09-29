import {createEvent, createStore} from "effector";
import {loginFx} from "./login_model.js";

export const $authStatus = createStore(false)

export const setAuthStatus = createEvent();
$authStatus.on(loginFx.doneData, () => true);
