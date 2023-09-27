import {Button, Card, Checkbox, Form, Input, List, Modal} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {$usersList, createUserFx, fetchUsersFx, updateUserFx, UsersGate} from "../../../models/admin/users_model.js";
import {useStore} from "effector-react";
import styles from "./UsersList.module.css";
import {updateTaskFx} from "../../../models/admin/taskEdit_model.js";


const UsersList = () => {
    const users = useStore($usersList);
    const loading = useStore(fetchUsersFx.pending);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);



    const showModal = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
        setIsEditMode(!!user);
    };



    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingUser(null);
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setIsEditMode(false);
        setIsModalVisible(true);
    };


    const onFinish = values => {
        if (isEditMode) {
        updateUserFx({ ...editingUser, ...values })
            .then(() => {
                handleCancel();
            })
            .catch(error => console.error('Update user error:', error));
            }
        else{
            createUserFx(values)
                .then(() => {
                    handleCancel();
                })
                .catch(error => console.error('Create user error:', error))
        }
    };

    return(
        <>
            <UsersGate/>
            <Card
                className={styles.usersListCard}
                title={'Users'}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddUser}
                    >
                        Add User
                    </Button>
                }
                >
                <List
                    itemLayout="horizontal"
                    dataSource ={users}
                    loading = {loading}

                    size="large"
                    renderItem={(user) => (
                        <List.Item
                            className={styles.userItem}
                            actions={[
                                <EditOutlined key="edit" onClick={() => showModal(user)} />,
                            ]}
                        >
                            <p>{user.login}</p>

                        </List.Item>
                    )}
                />
            </Card>
            <Modal
                title={isEditMode ? "Edit User" : "Add User"}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {(!isEditMode || editingUser) && (
                    <Form
                        key ={editingUser?.id}
                        initialValues={ editingUser}
                        onFinish={onFinish}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                    >
                        <Form.Item
                            label="Login"
                            name="login"
                            rules={[{ required: true, message: "Please input the username!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input the password!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="isAdmin"
                            valuePropName="checked"
                            wrapperCol={{ offset: 4, span: 14 }}
                        >
                            <Checkbox>Is Admin</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <div style={{display:'flex', gap:'1rem'}}>
                                <Button type="primary" htmlType="submit">
                                    {isEditMode ? "Update" : "Create"}
                                </Button>
                                <Button  onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>

                        </Form.Item>
                    </Form>

                )}
            </Modal>
        </>
    )
}
export default UsersList
