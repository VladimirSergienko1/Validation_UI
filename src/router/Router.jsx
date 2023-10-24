import App from '../App.jsx'
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import TasksPage from "../pages/Tasks/TasksPage.jsx";
import TaskItems from "../pages/TaskItems/TaksItems.jsx";
import UsersList from "../pages/admin/users/UsersList.jsx";

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <App/>,
        children: [
            {path: 'tasks', element: <TasksPage />},
            {path: 'tasks/:taskId', element: <TaskItems />},
         /*   {path: 'admin', element: <AdminPage />},*/
            {path: 'admin/users', element: <UsersList />},
            {path: 'tasks/edit/:taskId', element: <TaskItems />},

        ]
    }
],{basename: '/'})

export default routes