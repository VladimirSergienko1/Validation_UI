import {$tasks, fetchTasksFx} from "../../tasksModel/index.js";
import {createEffect, sample} from "effector";
import {createGate} from "effector-react";
import {api} from "../../../api/axios.js";

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
    return (await api().delete(`/tasks/delete/${taskId}`)).data
});

export const createTaskFx = createEffect(async (task) => {
    const {task_items, ...values} = task

    values['answer_options'] = [0, 1]

    const config = {headers: {"Content-Type": "multipart/form-data"}}
    const TaskItems = new FormData();
    TaskItems.append('task_items', task_items.file)

    // Create task itself
    return api().post('tasks/create', values)
        .then(res => res.data.id)
        // Create task items from xlsx
        .then(id => api().post(`/tasks/create/task-items/${id}`, TaskItems, config))
        .then(res => res.data)
});


export const TaskEditGate = createGate()

$tasks
    .on(updateTaskFx.doneData, (tasks, updatedTask) =>
    tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    )
    .on(createTaskFx.doneData, (tasks, newTask) =>
        [...tasks, newTask]
    );

sample({
    clock: [TaskEditGate.open, deleteTaskFx.doneData],
    target: fetchTasksFx,
    fn: (params) => params.taskId,
})

