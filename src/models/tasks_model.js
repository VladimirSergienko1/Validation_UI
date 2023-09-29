import {createEffect, createStore, sample} from "effector";
import {createGate} from "effector-react";

export const fetchTasksFx = createEffect(async () => {
    const response = await fetch('http://localhost:3000/tasks');
    return new Promise(resolve => {
        setTimeout( ()=>(
            resolve([])
        ),300)
    })

})

export const TasksGate = createGate()
export const $tasks = createStore([])

$tasks.on(fetchTasksFx.doneData, (_, tasks) => tasks);

sample({
    clock: TasksGate.open,
    target: fetchTasksFx
})