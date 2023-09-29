import {createEffect, createStore, sample} from "effector";
import {createGate} from "effector-react";
import {api} from "../api/axios.js";

export const fetchTasksFx = createEffect(async () => {
    return (await api().get('tasks')).data
})

export const TasksGate = createGate()
export const $tasks = createStore([])

$tasks.on(fetchTasksFx.doneData, (_, tasks) => tasks);

sample({
    clock: TasksGate.open,
    target: fetchTasksFx
})