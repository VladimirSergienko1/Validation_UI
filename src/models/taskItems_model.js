import {createEffect, createStore, sample} from "effector";
import {createGate} from "effector-react";
import {message} from "antd";


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



export const $taskItems = createStore([]).on(fetchTaskItemsFx.doneData,(_, items)=> items)

export const TaskItemsGate = createGate()

sample({
    source: TaskItemsGate.state,
    clock: TaskItemsGate.open,
    fn: (params) => params.taskId,
    target: fetchTaskItemsFx
})