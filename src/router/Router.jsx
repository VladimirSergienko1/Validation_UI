import App from '../App.jsx'
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import TasksPage from "../pages/Tasks/TasksPage.jsx";
import TaskItems from "../pages/TaskItems/TaksItems.jsx";
import AdminPage from "../pages/admin/AdminPage.jsx";
import UsersList from "../pages/admin/users/UsersList.jsx";
import EditTaskPage from "../pages/admin/EditTask/EditTaskPage.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
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