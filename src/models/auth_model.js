import {createEvent, createStore} from "effector";

export const $authStatus = createStore(false)

export const setAuthStatus = createEvent();
$authStatus.on(setAuthStatus, (_, newValue) => newValue);
