import axios, { AxiosInstance } from 'axios'

const clientHttp: AxiosInstance = axios.create({
    baseURL: "https://task-tracker-api-moleculer.herokuapp.com/api",
});

export default clientHttp