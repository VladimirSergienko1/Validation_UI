import React, { useState } from 'react'
import './App.css'
import {Navigate, Outlet} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {useStore} from "effector-react";
import {$authStatus, setAuthStatus} from "./models/auth_model.js";
import {Button, Layout} from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import {faker} from "@faker-js/faker";
import {loginFx, logOutFx} from "./models/login_model.js";



function App() {
    const authStatus = useStore($authStatus)

    const logOut = () =>{
        logOutFx().then(() => {
            setAuthStatus(false);
            Navigate('/');

        }).catch(error => {
            console.error('Login error:', error);
        });

    };
    const handleSubmit = () => {
        const mockData = {
            login: faker.internet.userName(),
            password: faker.internet.password(),
        };
        console.log('Mock Data:', mockData);




        loginFx(mockData).then(() => {
            setAuthStatus(true);
            Navigate('/tasks');

        }).catch(error => {
            console.error('Login error:', error);
        });

        form.resetFields();
    };

  console.log(React.version);

    if (!authStatus) {
        return <Navigate to="/" />;
    }
      return (
        <div>
            <Button
                className={'logout_btn'}
                type="primary"
                onClick={logOut}
                icon={<PoweroffOutlined />}
            >
            </Button>
            <Outlet />
        </div>
      )
}

export default App
