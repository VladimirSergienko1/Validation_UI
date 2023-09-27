import {Card, List} from "antd";
import {EditOutlined} from "@ant-design/icons";
import React from "react";
import {$usersList, fetchUsersFx, UsersGate} from "../../../models/admin/users_model.js";
import {useStore} from "effector-react";
import styles from "./UsersList.module.css";


const UsersList = () => {
    const users = useStore($usersList);
    const loading = useStore(fetchUsersFx.pending);
    return(
        <>
            <UsersGate/>
            <Card
                className={styles.usersListCard}
                title={'Users'}
                >
                <List
                    itemLayout="horizontal"
                 /*   dataSource={tasks}*/
                    dataSource ={users}
                    loading = {loading}

                    size="large"
                    renderItem={(user) => (
                        <List.Item className={styles.userItem} >
                            <p>{user.login}</p>

                        </List.Item>
                    )}
                />
            </Card>
        </>
    )
}
export default UsersList
