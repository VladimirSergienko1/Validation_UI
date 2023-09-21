import App from '../App.jsx'
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import TasksPage from "../pages/Tasks/TasksPage.jsx";

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <App/>,
        children: [
            {path: '/tasks', element: <TasksPage />},

        ]
    }
],{basename: '/'})

export default routes