import {useGate, useStore} from "effector-react";
import {$authStatus} from "../../models/auth_model.js";
import {useEffect, useState} from "react";
import {Card, List} from 'antd';
import styles from './TasksPage.module.css'
import {$tasks, fetchTasksFx, TasksGate} from "../../models/tasks_model.js";
import {Link} from "react-router-dom";

const TasksPage = () => {

    const tasks = useStore($tasks);
    const loading = useStore(fetchTasksFx.pending)

    return (
        <div>
            <TasksGate/>
            <h1>Tasks</h1>
            <Card className={styles.card__container}>
                <List
                    itemLayout="horizontal"
                    dataSource={tasks}
                    size="large"
                    loading={loading}

                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 20    ,
                    }}
                    renderItem={(item, index) => (
                        <Link to={`/tasks/task:${item.id}`}>
                        <List.Item className={styles.list__item}>
                            <List.Item.Meta
                                title={item.name}
                                description={item.description}
                            />
                            <p className={styles.list__item_count}>{`${item.done_count}/${item.task_items.length}`}</p>
                        </List.Item>
                            </Link>
                    )}
                />
            </Card>
        </div>
    )
}

export default TasksPage