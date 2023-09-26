import {useGate, useStore} from "effector-react";
import {$authStatus} from "../../models/auth_model.js";
import React, {useEffect, useState} from "react";
import {Card, Layout, List} from 'antd';
import styles from './TasksPage.module.css'
import {$tasks, fetchTasksFx, TasksGate} from "../../models/tasks_model.js";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {$user} from "../../models/login_model.js";
import {EditOutlined} from "@ant-design/icons";
import EditTaskPage from "../admin/EditTask/EditTaskPage.jsx";






const TasksPage = () => {

    const tasks = useStore($tasks);
    const loading = useStore(fetchTasksFx.pending)
    const user = useStore($user);
    const auth = useStore($authStatus)

    const navigate = useNavigate()

    console.log('Tasks auth',auth)

    console.log('State User from Tasks',user)


    return (
        <>
            <TasksGate/>
            <Layout.Content>
                <Card
                    title={'Tasks'}
                    className={(user && user.isAdmin)? styles.admin__card_container : styles.card__container}>
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
                           /* <Link  to={`/tasks/${item.id}`}>*/
                            <List.Item className={user.isAdmin ? styles.adminListItem : styles.list__item}  style={{border: '1px solid green'}}>


                                <List.Item.Meta
                                    title={item.name}
                                    description={item.description}
                                    style={{border: '1px solid red', maxWidth: '50%'}}
                                />

                                <div style={{display: 'flex', border: '1px solid blue'}}>
                                <p className={styles.list__item_count}>{`${item.task_items.filter(item=> !item.answered).length}/${item.task_items.length}`}</p>
                                </div>
                                {user.isAdmin &&
                                <div style={{display: 'flex', border: '1px solid yellow'}}>
                                     <EditOutlined onClick={() => navigate(`/admin/edit/${item.id}`) }/>
                                </div>
                                }
                            </List.Item>

                              /*  </Link>*/

                        )}

                    />

                </Card>
            </Layout.Content>
        </>
    )
}

export default TasksPage