import React from 'react'
import './App.css'
import {Link, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useStore} from "effector-react";
import {$authStatus} from "./models/auth_model.js";
import {Button, Layout, Spin, Menu} from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import {$user, logOutFx} from "./models/login_model.js";
import {
    TeamOutlined, UnorderedListOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
function App() {
    const authStatus = useStore($authStatus)

    const user = useStore($user)
    const navigate = useNavigate();

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
        logOutFx()
            .then(() => {navigate('/');})
            .catch(error => {
            console.error('Login error:', error);
        });

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
