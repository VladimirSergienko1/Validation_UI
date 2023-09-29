import React, {useEffect} from 'react';
import {Button, Input, Form, Typography, Card} from 'antd';
import styles  from './LoginPage.module.css';
import {useEvent, useStore} from "effector-react";
import {$user, loginEv, loginFx} from "../../models/login_model.js";
import {useNavigate} from "react-router-dom";
import {$authStatus} from "../../models/auth_model.js";



const { Title } = Typography;

const LoginPage = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const loading = useStore(loginFx.pending);

    const status = useStore($authStatus);
    const user = useStore($user);

    const onLogin = useEvent(loginEv)

    useEffect(() => {
        if (user?.isAdmin) {
            navigate('/tasks')
        }
    }, [user]);


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
                    ["login"]: 'admin2',
                    ["password"]: 'not-random',
                }}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[{ required: true, message: 'Please input your login!' }]}
                >
                    <Input
                        name="login"
                        value={''}
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        name="password"
                        value={''}
                    />
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
