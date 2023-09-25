import App from '../App.jsx'
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import TasksPage from "../pages/Tasks/TasksPage.jsx";
import TaskItems from "../pages/TaskItems/TaksItems.jsx";
import AdminPage from "../pages/admin/AdminPage.jsx";

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
            {path: 'admin', element: <AdminPage />},

        ]
    }
],{basename: '/'})

export default routes