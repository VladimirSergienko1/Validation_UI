import React, {useRef, useState} from 'react';
import { useStore } from 'effector-react';
import { Modal, Form, Input, Button, Upload  } from 'antd';
import styles from '../../Tasks/TasksPage.module.css';
import {createTaskFx, deleteTaskFx, updateTaskFx} from "../../../models/admin/taskEdit_model.js";
import {$user} from "../../../models/login_model.js";
import {$tasks} from "../../../models/tasks_model.js";
import {InboxOutlined} from "@ant-design/icons";

const EditTaskPage = ({ isOpen, taskId, onCancel, isEditMode  }) => {
    const user = useStore($user);
    const tasks = useStore($tasks);

    const task = tasks.find(t => t.id === parseInt(taskId));


    const onFinish = values => {
        if (isEditMode && task) {
            updateTaskFx({ ...task, ...values })
                .then(() => {
                    onCancel();
                })
                .catch(error => console.error('Update task error:', error));
        } else {
            createTaskFx(values)
                .then(() => {
                    onCancel();
                })
                .catch(error => console.error('Create task error:', error));
        }
    };

    const handleDelete = () => {
        deleteTaskFx(taskId)
            .then(() => {
                onCancel();
            })
            .catch(error => console.error('Delete task error:', error));
    };


    return (
        <Modal
            title={isEditMode ? (task ? `Edit Task: ${task.name}` : '') : 'Create Task'}
            visible={isOpen}
            onCancel={onCancel}
            footer={null}
        >
            {(!isEditMode|| task) && (
                <Form initialValues={task} onFinish={onFinish}
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
                        <div style={{display: 'flex', gap: '2em'}}>

                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button  onClick={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={handleDelete} danger >
                            Delete
                        </Button>
                        </div>

                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default EditTaskPage;
