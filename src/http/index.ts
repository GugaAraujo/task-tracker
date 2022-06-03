import axios, { AxiosInstance } from 'axios'

const clientHttp: AxiosInstance = axios.create({
    baseURL: "https://fakeapi-service.herokuapp.com/",
});

export default clientHttp