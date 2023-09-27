import React, { useState } from 'react'
import './App.css'
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {useStore} from "effector-react";
import {$authStatus, setAuthStatus} from "./models/auth_model.js";
import {Button, Layout, Spin, Menu} from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import {faker} from "@faker-js/faker";
import {$user, loginFx, logOutFx, setAdminStatus} from "./models/login_model.js";
import {
    TeamOutlined, UnorderedListOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
function App() {
    const authStatus = useStore($authStatus)

    const user = useStore($user)

    const location = useLocation();
    /*const selectedKey =  location.pathname === "/tasks" ? "sub1" : "sub2";*/
    let selectedKey;

   /* if (location.pathname.startsWith("/admin/edit/")) {
        selectedKey = "sub2";
    } else {*/
        switch (location.pathname) {
            case "/tasks":
                selectedKey = "sub1";
                break;
            case "/admin/users":
                selectedKey = "sub2";
                break;
            default:
                selectedKey = "";
        }
   /* }*/


    const logOut = () =>{
        logOutFx().then(() => {
            setAuthStatus(false);
            setAdminStatus(false);
            Navigate('/');

        }).catch(error => {
            console.error('Login error:', error);
        });

    };
  /*  const handleSubmit = () => {
        const mockData = {
            login: faker.internet.userName(),
            password: faker.internet.password(),
        };
        console.log('Mock Data:', mockData);




        loginFx(mockData).then(() => {
            setAuthStatus(true);
            setAdminStatus(true);
            Navigate('/tasks');

        }).catch(error => {
            console.error('Login error:', error);
        });

        form.resetFields();
    };*/

  console.log(React.version);

    if (!authStatus) {
        return <Navigate to="/" />;
    }
      return (
        <div>
            <Spin spinning={false} tip={'Loading'}>
                <Layout style={{width: '90%', margin: '0 auto', minHeight:'600px'}}>
                    {user && user.isAdmin && (
                        <Sider collapsed={true}>
                            <div className="demo-logo-vertical" />
                            <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
                                <Menu.Item key="sub1"  icon={<UnorderedListOutlined />}>
                                    <Link to="/tasks">Tasks</Link>
                                </Menu.Item>
                                <Menu.Item key="sub2" icon={<TeamOutlined />}>
                                    <Link to="/admin/users">Users</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                    )}
            <Button
                className={'logout_btn'}
                type="primary"
                onClick={logOut}
                icon={<PoweroffOutlined />}
            >
            </Button>
            <Outlet />
                </Layout>
            </Spin>
        </div>

      )
}

export default App
