import React, { useState } from 'react';
import {Button, Input, Form, Typography, Card} from 'antd';
import styles  from './LoginPage.module.css';
import {useStore} from "effector-react";
/*import {$formData, changeFormData, submitForm} from "../../models/login_model.js";*/
import {faker} from "@faker-js/faker";
import {loginFx} from "../../models/login_model.js";
import {useNavigate} from "react-router-dom";
import {$authStatus, setAuthStatus} from "../../models/auth_model.js";
/*import {submitForm, $formData, changeFormData} from "../../models/login_model.js";*/



const { Title } = Typography;

const LoginPage = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const loading = useStore(loginFx.pending);

    const status = $authStatus;




    const handleSubmit = () => {
        const mockData = {
            login: faker.internet.userName(),
            password: faker.internet.password(),
        };
        console.log('Mock Data:', mockData);

        loginFx(mockData).then(() => {
            setAuthStatus(true);
            navigate('/tasks');

        }).catch(error => {
            console.error('Login error:', error);
        });

        form.resetFields();
    };

    return (
        <Card className={styles.login__container}>
            <Title level={2}>Login Page</Title>
            <Form
                form={form}
                initialValues={{
                    ["login"]: '',
                    ["password"]: '',
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
