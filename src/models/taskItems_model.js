import {createEffect, createEvent, createStore, sample} from "effector";
import {createGate} from "effector-react";
import {message} from "antd";
import taksItems from "../pages/TaskItems/TaksItems.jsx";
import {loginFx} from "./login_model.js";


export const fetchTaskItemsFx = createEffect( async(taskId) =>{

    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return new Promise(async resolve => {
            setTimeout(async () => {
                const data = await response.json();
                resolve(data.task_items);
            }, 300);
        });
    } catch (error) {
        console.error(error);
        message.error('Failed to load task items.');
    }


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