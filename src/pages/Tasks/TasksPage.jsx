import React, {useEffect, useState} from 'react';
import { useStore } from 'effector-react';
import {Layout, Card, List, Modal, Button} from 'antd';
import {$tasks, fetchTasksFx, TasksGate} from "../../models/tasks_model.js";
import { $user } from "../../models/login_model.js";
import styles from './TasksPage.module.css'
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import EditTaskPage from "../admin/EditTask/EditTaskPage.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";

const TasksPage = () => {
    const tasks = useStore($tasks);
    const loading = useStore(fetchTasksFx.pending)
    const user = useStore($user);
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

  /*  const { taskId } = useParams();*/
    /*useEffect(() => {
        if (taskId) {
            setEditingTaskId(taskId);
            setIsModalVisible(true);
        }
    }, [taskId]);*/

    const [isEditMode, setIsEditMode] = useState(false);


    const handleEditClick = (taskId) => {

        setEditingTaskId(taskId);
        setIsModalVisible(true);
        setIsEditMode(true);
        window.history.replaceState(null, '', `/tasks/edit/${taskId}`);
    };
    const handleAddTask = () => {
        setEditingTaskId(null);
        setIsEditMode(false);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingTaskId(null);
        window.history.replaceState(null, '', `/tasks`);
    };



    return (
        <>
            <TasksGate />
                <Card
                    title={'Tasks'}
                    className={(user && user.isAdmin) ? styles.admin__card_container : styles.card__container}
                    extra={
                        (user && user.isAdmin) ? (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={()=>handleAddTask()}

                            >
                                Add Task
                            </Button>
                        ) : ''
                    }
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={tasks}
                        size="large"
                        loading={loading}
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 6,
                        }}
                        renderItem={(item) => (

                            user?.isAdmin ? (
                                <List.Item className={user?.isAdmin ? styles.adminListItem : styles.list__item}>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={item.description}
                                    />
                                    <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between'}}>
                                        <p className={styles.list__item_count}>
                                            {`${item.task_items.filter(item => !item.answered).length}/${item.task_items.length}`}
                                        </p>
                                        <div style={{ display: 'flex' }}>
                                            <EditOutlined onClick={() => handleEditClick(item.id)} />
                                        </div>
                                    </div>
                                </List.Item>
                            ) :
                            (
                                <Link to={`/tasks/${item.id}`}>
                                    <List.Item className={user?.isAdmin ? styles.adminListItem : styles.list__item}>
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.description}
                                        />
                                        <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between'}}>
                                            <p className={styles.list__item_count}>
                                                {`${item.task_items.filter(item => !item.answered).length}/${item.task_items.length}`}
                                            </p>
                                        </div>
                                    </List.Item>
                                </Link>
                            )
                        )}
                    />
                </Card>
                <EditTaskPage key={editingTaskId} isOpen={isModalVisible} taskId={editingTaskId} onCancel={handleCancel}  isEditMode={isEditMode} />
        </>
    );
};

export default TasksPage;
