import {useGate, useStore} from "effector-react";
import {$authStatus} from "../../models/auth_model.js";
import React, {useEffect, useState} from "react";
import {Card, Layout, List} from 'antd';
import styles from './TasksPage.module.css'
import {$tasks, fetchTasksFx, TasksGate} from "../../models/tasks_model.js";
import {Link} from "react-router-dom";
import {$user} from "../../models/login_model.js";

const { Sider } = Layout;
const TasksPage = () => {

    const tasks = useStore($tasks);
    const loading = useStore(fetchTasksFx.pending)

    const user = useStore($user);

    console.log('State User from Tasks',user)

    return (
        <div className={styles.task_page}>
            <TasksGate/>

            <Card
                title={'Tasks'}
                className={styles.card__container}>
                <List
                    itemLayout="horizontal"
                    dataSource={tasks}
                    size="large"
                    loading={loading}

                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 6    ,
                    }}
                    renderItem={(item, index) => (
                        <Link to={`/tasks/${item.id}`}>
                        <List.Item className={styles.list__item} >
                            <List.Item.Meta
                                title={item.name}
                                description={item.description}
                            />
                            <p className={styles.list__item_count}>{`${item.task_items.filter(item=> !item.answered).length}/${item.task_items.length}`}</p>
                        </List.Item>
                            </Link>
                    )}
                />
            </Card>
        </div>
    )
}

export default TasksPage