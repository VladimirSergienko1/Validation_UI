import React, {useEffect, useState} from 'react';
import {Button, Input, Form, Typography, Card, Spin} from 'antd';
import styles  from './LoginPage.module.css';
import {useStore} from "effector-react";
/*import {$formData, changeFormData, submitForm} from "../../models/login_model.js";*/
import {faker} from "@faker-js/faker";
import {$user, loginFx, LoginGate, setAdminStatus} from "../../models/login_model.js";
import {Link, useNavigate} from "react-router-dom";
import {$authStatus, setAuthStatus} from "../../models/auth_model.js";
/*import {submitForm, $formData, changeFormData} from "../../models/login_model.js";*/



const { Title } = Typography;

const LoginPage = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const loading = useStore(loginFx.pending);

    const status = useStore($authStatus);
    const user = useStore($user);

    console.log('Auth status',status)
    console.log('State User',user)

    if (status){
       /* if (user && user.isAdmin){
            navigate('/tasks');
        }
        else{
            navigate('/tasks');

        }*/
        navigate('/tasks');
    }


    const handleSubmit = () => {
        const mockData = {
            login: 'admin',
            password: 'admin ',
            /*login: faker.internet.userName(),
            password: faker.internet.password(),*/
        };
        console.log('Mock Data:', mockData);




        loginFx(mockData).then(user => {
            setAuthStatus(true);


            if(mockData.login==='admin') {
                /*setAdminStatus(true);
                navigate('/admin');*/
                console.log('User is Admin ' , user.isAdmin);
            }
            else{
                navigate('/tasks');
            }
        }).catch(error => {
            console.error('Login error:', error);
        });


        form.resetFields();
    };

    return (
        <Card className={styles.login__container}>
            <LoginGate/>

            <Title level={2}>Login Page</Title>
            <Form
                form={form}
                initialValues={{
                    ["login"]: 'd',
                    ["password"]: 'd',
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
