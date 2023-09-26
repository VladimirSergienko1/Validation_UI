import {$tasks, fetchTasksFx} from "../tasks_model.js";
import {createEffect, sample} from "effector";
import {useState} from "react";
import {createGate} from "effector-react";

export const updateTaskFx = createEffect(async (task) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error('response not ok ' + response.statusText);
    }

    return task;
});

export const TaskEditGate = createGate()

$tasks.on(updateTaskFx.doneData, (tasks, updatedTask) =>
    tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
);

sample({
    clock: TaskEditGate.open,
    target: fetchTasksFx,
    fn: (params) => params.taskId,
})