import axios from "axios";
import Cookies from "universal-cookie";
import {notification} from "antd";

const cookies = new Cookies()

export const api = (auth = true) => {
    // @ts-ignore
    const instance = axios.create({baseURL: 'http://localhost:3000/api/v1', withCredentials: true})

    // if (auth) {
    //     const access_token = cookies.get('access_token')
    //     instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    // }

    instance.interceptors.response.use((response) => {
        return response;
    }, async (error) => {

        if (error.request.status === 0) {
            notification.error({
                message: "Error",
                description: 'Network error',
                placement: 'topRight'
            });
        } else if (error.response.status === 401 && error.config.url === "/auth/") {
            cookies.remove('access_token', {path: '/'})
            // document.location.reload()

        } else if (error.response.status === 401) {
            cookies.remove('access_token', {path: '/'})
            document.location.reload()

            try {
                return instance(error.config)
            } catch (e) {
                cookies.remove('access_token', {path: '/'})
                document.location.reload()
            }

        }
        notification.error({
            message: error.response.statusText,
            description: `${error.response.data.message}`,
            placement: 'topRight'
        });
        return Promise.reject(error);
    });

    return instance;
}