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

    const [answers, setAnswers] = useState({});

    const [selectedAnswers, setSelectedAnswers] = useState({});


    const handleClick = (itemId, answer) => {
        setAnswers(prevAnswers => {
            if (prevAnswers[itemId] === answer) {
                const newAnswers = { ...prevAnswers };
                delete newAnswers[itemId];
                setSelectedAnswers(prevSelected => {
                    const newSelected = { ...prevSelected };
                    delete newSelected[itemId];
                    return newSelected;
                });
                return newAnswers;
            }

            setSelectedAnswers(prevSelected => ({ ...prevSelected, [itemId]: answer }));

            return { ...prevAnswers, [itemId]: answer };
        });
    };



    const handleApply = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
            if (!response.ok) {
                throw new Error('response not ok');
            }
            const task = await response.json();
            for (const [itemId, answer] of Object.entries(answers)) {
                const taskItem = task.task_items.find(item => item.id === Number(itemId));
                if (taskItem) {
                    taskItem.answered = true;
                    taskItem.user_answer = answer;
                }
            }
            const updateResponse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            if (!updateResponse.ok) {
                throw new Error('Failed to update taskItems');
            }
            task.task_items.forEach(updatedTaskItem => {
                updateTaskItemEv(updatedTaskItem);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <TaskItemsGate taskId={taskId} />
            <Card className={styles.card__container} title={'Tasks List'}>
                <List
                    loading={loading}
                    dataSource={taskItems.filter(item => !item.answered)}
                    renderItem={item => (
                        <List.Item key={item.id} className={styles.task_item}>
                            <div>{'ID ' + item.id} {'Task ID: '+ item.task_id}</div>
                            <p>{item.description}</p>
                            <div className={styles.buttons_container}>
                                {item.answers.map(answer => (
                                    <Button
                                        key={answer}
                                        onClick={() => handleClick(item.id, answer)}
                                        type={selectedAnswers[item.id] === answer ? "primary" : "default"}
                                    >
                                        {answer}
                                    </Button>
                                ))}
                            </div>
                        </List.Item>
                    )}

                />
                <Button type={"primary"} onClick={handleApply} style={{width:'150px', marginTop: '10px'}}>Apply</Button>
            </Card>

        </>
    );
}

export default TaskItems