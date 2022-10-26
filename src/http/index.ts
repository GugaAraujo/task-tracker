import axios, { AxiosInstance } from 'axios'

const clientHttp: AxiosInstance = axios.create({
    baseURL: "https://task-tracker-api-moleculer.herokuapp.com/api",
});

clientHttp.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default clientHttp;
