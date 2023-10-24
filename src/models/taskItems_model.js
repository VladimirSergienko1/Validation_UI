import {createEffect, createEvent, createStore, sample} from "effector";
import {createGate} from "effector-react";
import {api} from "../api/axios.js";


export const fetchTaskItemsFx = createEffect( async(taskId) => {
    return ((await api().get(`/task-item/by-task/${taskId}`)).data)
})

export const updateTaskItemEv = createEvent();



export const $taskItems = createStore([])
    .on(fetchTaskItemsFx.doneData,(_, items)=> items)
    .on(updateTaskItemEv, (taskItems, updatedTaskItem) => {
        return taskItems.map(taskItem =>
            taskItem.id === updatedTaskItem.id ? updatedTaskItem : taskItem
        );
    })

export const TaskItemsGate = createGate()

sample({
    source: TaskItemsGate.state,
    clock: TaskItemsGate.open,
    fn: (params) => params.taskId,
    target: fetchTaskItemsFx
})