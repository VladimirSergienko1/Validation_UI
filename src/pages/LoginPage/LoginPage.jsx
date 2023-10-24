import React, {useEffect} from 'react';
import {Button, Input, Form, Typography, Card} from 'antd';
import styles  from './LoginPage.module.css';
import {useEvent, useGate, useStore} from "effector-react";
import {loginEv, loginFx, $authStatus, AppGate} from "../../models/auth_model";
import {useNavigate} from "react-router-dom";



const { Title } = Typography;

const LoginPage = () => {
    useGate(AppGate)

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const loading = useStore(loginFx.pending);
    const authStatus = useStore($authStatus)

    useEffect(() => {
        if (authStatus) {
            navigate('/tasks')
        }
    }, [authStatus]);

    const onLogin = useEvent(loginEv)


    const handleSubmit = (values) => {
        onLogin(values)

        form.resetFields();
    };

    return (
        <Card className={styles.login__container}>
            <Title level={2}>Login Page</Title>
            <Form
                form={form}
                initialValues={{
                    ["login"]: 'admin',
                    ["password"]: 'admin',
                }}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[{ required: true, message: 'Please input your login!' }]}
                >
                    <Input name="login"/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password name="password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginPage;
