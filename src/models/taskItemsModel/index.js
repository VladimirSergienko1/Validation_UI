import {createEffect, createEvent, createStore, sample} from "effector";
import {createGate} from "effector-react";
import {api} from "../../api/axios.js";


export const fetchTaskItemsFx = createEffect( async(taskId) => {
    return ((await api().get(`/task-item/by-task/${taskId}`)).data)
})

export const updateTaskItemEv = createEvent();

export const postAnswersEv = createEvent()

export const postAnswersFx = createEffect()
    .use(async (answers) => (await api().post('/answers/new', answers)).data)

export const $taskItems = createStore([])
    .on(fetchTaskItemsFx.doneData,(_, items)=> items)
    .on(updateTaskItemEv, (taskItems, updatedTaskItem) => {
        return taskItems.map(taskItem =>
            taskItem.id === updatedTaskItem.id ? updatedTaskItem : taskItem
        );
    })

export const TaskItemsGate = createGate()

sample({
    clock: TaskItemsGate.state,
    filter: (gate) => !!gate.taskId,
    fn: (params) => params.taskId,
    target: fetchTaskItemsFx
})

sample({
    source: TaskItemsGate.state,
    clock: postAnswersFx.doneData,
    filter: (gate) => !!gate.taskId,
    fn: (gate) => gate.taskId,
    target: fetchTaskItemsFx
})

sample({
    clock: postAnswersEv,
    fn: (answers) => Object.entries(answers).map(i => ({task_item_id: parseInt(i[0]), value: i[1]})),
    target: postAnswersFx
})