import {$tasks, fetchTasksFx} from "../tasks_model.js";
import {createEffect, sample} from "effector";
import {createGate} from "effector-react";
import {api} from "../../api/axios.js";

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



export const deleteTaskFx = createEffect(async (taskId) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task: ' + response.statusText);
    }

    return taskId;
});

export const createTaskFx = createEffect(async (task) => {
    const {task_items, ...values} = task
    const config = {headers: {"Content-Type": "multipart/form-data"}}
    const Body = new FormData();
    Body.append('task_items', task_items.file)
    Object.entries(values).forEach(kv => Body.append(kv[0], JSON.stringify(kv[1])))

    return (await api().post('/tasks/create', Body, config))
});


export const TaskEditGate = createGate()

$tasks.on(updateTaskFx.doneData, (tasks, updatedTask) =>
    tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
).on(deleteTaskFx.doneData, (tasks, deletedTaskId) =>
    tasks.filter(task => task.id !== deletedTaskId)
).on(createTaskFx.doneData, (tasks, newTask) =>
    [...tasks, newTask]
);

sample({
    clock: TaskEditGate.open,
    target: fetchTasksFx,
    fn: (params) => params.taskId,
})

