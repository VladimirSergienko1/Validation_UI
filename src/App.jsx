import React from 'react'
import './App.css'
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {useEvent, useStore} from "effector-react";
import {$authStatus, logoutEv} from "./models/auth_model.js";
import {Button, Layout, Spin, Menu} from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import {$user} from "./models/login_model.js";
import {
    TeamOutlined, UnorderedListOutlined,
} from '@ant-design/icons';
import Cookies from "universal-cookie";

const { Sider } = Layout;
function App() {
    const cookies = new Cookies()
    const authStatus = useStore($authStatus)
    const logout = useEvent(logoutEv)

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


    const logOut = () => {
        cookies.remove('access_token', {path: '/'})
        logout()
    };


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
