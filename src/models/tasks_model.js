import {createEffect, createStore, sample} from "effector";
import {createGate} from "effector-react";

export const fetchTasksFx = createEffect(async () => {
    const response = await fetch('http://localhost:3001/tasks');
    return new Promise(resolve => {
        setTimeout(()=>{
            return resolve(response.json())
        },500)
    })

})

export const TasksGate = createGate()
export const $tasks = createStore([]).on(fetchTasksFx.doneData, (_, tasks) => tasks);

sample({
    clock: TasksGate.open,
    target: fetchTasksFx
})