import axios, { AxiosInstance } from 'axios'

const clientHttp: AxiosInstance = axios.create({
    baseURL: "https://task-tracker-api-moleculer.herokuapp.com",
});

export default clientHttp