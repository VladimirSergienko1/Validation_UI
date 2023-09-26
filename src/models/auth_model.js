import {createEvent, createStore} from "effector";
import {fa} from "@faker-js/faker";

export const $authStatus = createStore(false)

export const setAuthStatus = createEvent();
$authStatus.on(setAuthStatus, (_, newValue) => newValue);
