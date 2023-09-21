import {useStore} from "effector-react";
import {$authStatus} from "../../models/auth_model.js";
import {useEffect, useState} from "react";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    console.log('Tasks',status)
    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.name} (Task Items: {task.task_items_count})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TasksPage