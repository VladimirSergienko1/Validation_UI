import {createEffect, createEvent, createStore} from 'effector';

export const changeFormData = createEvent();
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
