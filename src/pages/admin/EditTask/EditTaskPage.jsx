import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Layout, Form, Input, Button } from 'antd';
import { $user } from '../../../models/login_model.js';
import styles from '../../Tasks/TasksPage.module.css';
import {$tasks, fetchTasksFx} from "../../../models/tasks_model.js";
import {TaskEditGate, updateTaskFx} from "../../../models/admin/taskEdit_model.js";

const EditTaskPage = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const user = useStore($user);
    const tasks = useStore($tasks);


    const task = tasks.find(t => t.id === parseInt(taskId));

    const onFinish = values => {
        updateTaskFx({ ...task, ...values })
            .then(() => navigate('/tasks'))
            .catch(error => console.error('Update task error:', error));
    };

    if (!task) navigate('/tasks');

    return (
        <Layout.Content>
            <TaskEditGate taskId={taskId} />
            <Card
                title={`Edit Task: ${task.name}`}
                className={user && user.isAdmin ? styles.admin__card_container : styles.card__container}
            >
                <Form initialValues={task} onFinish={onFinish} style={{width: '500px'}}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the task name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the task description!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout.Content>
    );
};

export default EditTaskPage;
