import roteador from '@/roteador';
import axios, { AxiosInstance } from 'axios'
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { store } from "@/store"

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

clientHttp.interceptors.response.use(null, error => {
    const { status, message, name } = error.response.data;
    console.log(error.response.data)

    if(status === 401) {
        roteador.push('/login');
    } else if (status === 403) {
        store.commit(NOTIFICAR, {
            titulo: "Não permitido",
            texto: 'Seu usuário não tem permissão para realizar esta operação',
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);
    }

    if (message === 'This email already exists') {
        store.commit(NOTIFICAR, {
            titulo: "E-mail já existente",
            texto: "Por favor, escolha outro e-mail para cadastrar",
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);

    } if (message === 'Passwords must be the same!') {
        store.commit(NOTIFICAR, {
            titulo: "Senhas diferentes",
            texto: "As senhas devem ser iguais",
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);

    } else if (message === 'the database system is starting up') {
        store.commit(NOTIFICAR, {
            titulo: "Ooops...",
            texto: "O bando de dados se encontra em manutenção",
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);

    } else if (message === 'Email is not found')  {
        store.commit(NOTIFICAR, {
            titulo: "Não autorizado",
            texto: 'Confira seu e-mail',
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);

    } else if (message === 'Password incorrect') {
        store.commit(NOTIFICAR, {
            titulo: "Não autorizado",
            texto: 'Confira sua senha',
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);

    } else if (message === 'Parameters validation error!') {
        store.commit(NOTIFICAR, {
            titulo: "Erro",
            texto: 'Confira se os campos foram registrados corretamente',
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);

    } else {
        store.commit(NOTIFICAR, {
            titulo: "Erro",
            texto: `${message}`,
            tipo: TipoNotificacao.FALHA,
        }, { root: true });
        throw new Error(error);

    }
});

export default clientHttp;
