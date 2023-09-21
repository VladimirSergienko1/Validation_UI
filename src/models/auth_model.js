import {createEvent, createStore} from "effector";

export const $authStatus = createStore(true)

export const setAuthStatus = createEvent();
$authStatus.on(setAuthStatus, (_, newValue) => newValue);
