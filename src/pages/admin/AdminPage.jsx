import {$user} from "../../models/authModel/index.js";
import {useStore} from "effector-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const AdminPage = () => {
    const user = useStore($user);
    const navigate = useNavigate();
    console.log(user,'Admin page User state')

    useEffect(() => {
        if (user && !user.isAdmin) {
            navigate('/');
        }
    }, [user, navigate]);

return(
    <div>
        <h1>HELLO</h1>
    </div>
)

}

export default AdminPage