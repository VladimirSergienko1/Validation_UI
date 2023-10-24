import {Button, Card, List} from "antd";
import {useState} from "react";
import { useParams } from "react-router-dom";
import {
    $taskItems,
    fetchTaskItemsFx,
    postAnswersEv,
    TaskItemsGate,
    updateTaskItemEv
} from "../../models/taskItemsModel/index.js";
import {useEvent, useStore, useStoreMap} from "effector-react";
import styles from "./TaskItems.module.css"
import {$user} from "../../models/authModel/index.js";

const TaskItems = () => {

    const ContainerHeight = 400;
    const { taskId } = useParams();
    const taskItems = useStore($taskItems)
    const loading = useStore(fetchTaskItemsFx.pending)
    const curUserId = useStoreMap($user, usr => usr.id)

    const postAnswers = useEvent(postAnswersEv)

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
        postAnswers(answers)
        // try {
        //     const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        //     if (!response.ok) {
        //         throw new Error('response not ok');
        //     }
        //     const task = await response.json();
        //     for (const [itemId, answer] of Object.entries(answers)) {
        //         const taskItem = task.task_items.find(item => item.id === Number(itemId));
        //         if (taskItem) {
        //             taskItem.answered = true;
        //             taskItem.user_answer = answer;
        //         }
        //     }
        //     const updateResponse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(task)
        //     });
        //     if (!updateResponse.ok) {
        //         throw new Error('Failed to update taskItems');
        //     }
        //     task.task_items.forEach(updatedTaskItem => {
        //         updateTaskItemEv(updatedTaskItem);
        //     });
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };


    return (
        <>
            <TaskItemsGate taskId={taskId} />
            <Card className={styles.card__container} title={'Tasks List'}>
                <List
                    loading={loading}
                    dataSource={taskItems.filter(item => !item?.answers?.some(ans => ans?.user_id === curUserId))}
                    renderItem={item => (
                        <List.Item key={item.id} className={styles.task_item}>
                            <div>{'ID ' + item.id} {'Task ID: '+ item.taskId}</div>
                            <p>{item.description}</p>
                            <div className={styles.buttons_container}>
                                {item?.answer_options?.map(answer => (
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