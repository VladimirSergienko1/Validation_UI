import React, {useRef, useState} from 'react';
import { useStore } from 'effector-react';
import { Modal, Form, Input, Button, Upload  } from 'antd';
import styles from '../../Tasks/TasksPage.module.css';
import {deleteTaskFx, updateTaskFx} from "../../../models/admin/taskEdit_model.js";
import {$user} from "../../../models/login_model.js";
import {$tasks} from "../../../models/tasks_model.js";
import {useNavigate, useParams} from "react-router-dom";
import FormItem from "antd/es/form/FormItem/index.js";
import {InboxOutlined} from "@ant-design/icons";

const EditTaskPage = ({ isOpen, taskId, onCancel }) => {
    const user = useStore($user);
    const tasks = useStore($tasks);

    const task = tasks.find(t => t.id === parseInt(taskId));


    const onFinish = values => {
        updateTaskFx({ ...task, ...values })
            .then(() => {
                onCancel();
            })
            .catch(error => console.error('Update task error:', error));
    };
    const handleDelete = () => {
        // вызываем функцию для удаления задачи
        deleteTaskFx(taskId)
            .then(() => {
                // после успешного удаления закрываем модальное окно
                onCancel();
            })
            .catch(error => console.error('Delete task error:', error));
    };


    return (
        <Modal
            title={task ? `Edit Task: ${task.name}` : ''}
            visible={isOpen}
            onCancel={onCancel}
            footer={null}
        >
            {task && (
                <Form initialValues={task} onFinish={onFinish} style={{ width: '500px' }}
                      labelCol={{
                          span: 4,
                      }}
                      wrapperCol={{
                          span: 14,
                      }}
                >
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
                    <Form.Item
                        label="task_items"
                        name="task_items"
                    >
                        <Upload.Dragger name="file"  beforeUpload={() => false}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button type="primary" onClick={handleDelete} danger style={{ marginLeft: '10px' }}>
                            Delete
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default EditTaskPage;
