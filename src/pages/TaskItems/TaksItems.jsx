import {Button, Card, List, message} from "antd";
import VirtualList from 'rc-virtual-list';
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {$taskItems, fetchTaskItemsFx, TaskItemsGate, updateTaskItemEv} from "../../models/taskItems_model.js";
import {useStore} from "effector-react";
import styles from "./TaskItems.module.css"
const TaskItems = () =>{

    const ContainerHeight = 400;
    const { taskId } = useParams();
    const taskItems = useStore($taskItems)
    const loading = useStore(fetchTaskItemsFx.pending)

    console.log('TaskID', taskId)
    console.log('TaskItems', taskItems)



      /*  const onScroll = (e) => {
            if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
                appendData();
            }
        };*/

    const handleClick = async (itemId, answer) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
            if (!response.ok) {
                throw new Error('response not ok');
            }
            const task = await response.json();
            const taskItem = task.task_items.find(item => item.id === itemId);
            if (taskItem) {
                taskItem.answered = true;
                taskItem.user_answer = answer;
                const updateResponse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                });
                if (!updateResponse.ok) {
                    throw new Error('Failed to update taskItem');
                }
                updateTaskItemEv(taskItem);
                console.log('TaskItem updated:', taskItem);
            } else {
                console.error('TaskItem not found:', itemId);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


        return(
        <>
            <TaskItemsGate taskId={taskId} />
            <Card className={styles.card__container}>
                <List
                    loading = {loading}
                >
                    <VirtualList
                        data={taskItems.filter(item => !item.answered)}
                        height={ContainerHeight}
                        itemKey="id"
                        /*onScroll={onScroll}*/
                    >
                        {item => (
                            <List.Item key={item.id} className={styles.task_item}>
                                <div>{'ID ' + item.id} {'Task ID: '+ item.task_id}</div>
                                <p>{item.description}</p>


                                <div className={styles.buttons_container}>
                                    {item.answers.map(answer => (
                                        <Button key={answer} onClick={() => handleClick(item.id, answer)}>
                                            {answer}
                                        </Button>
                                    ))}
                                </div>
                            </List.Item>

                        )}
                    </VirtualList>
                </List>
            </Card>
        </>
    )
}

export default TaskItems