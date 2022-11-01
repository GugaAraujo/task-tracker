import roteador from '@/roteador';
import axios, { AxiosInstance } from 'axios'
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { store } from "@/store"

const clientHttp: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API,
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
    const { status, message, data, code } = error.response.data;
    console.log(error.response.data)

    if (code === 401 || status === 401) {
        roteador.push('/logout');
    } else if (code === 403 || status === 403) {
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
        let title = 'Erro';
        let messageToSend = 'Confira se os campos estão corretos';

        const invalidParameter = data[0];
        if (invalidParameter.message === "The 'email' field must be a valid e-mail.") {
            title = 'E-mail inválido'
            messageToSend = 'Você deve indicar um e-mail válido'
        }
        if (invalidParameter.message === "The 'password' field length must be less than or equal to 8 characters long.") {
            title = 'Senha muito longa'
            messageToSend = 'A senha deve ter até 8 caracteres'
        }
        if (invalidParameter.message === "The 'password' field length must be greater than or equal to 6 characters long.") {
            title = 'Senha muito curta'
            messageToSend = 'A senha deve ter ao menos 6 caracteres'
        }

        store.commit(NOTIFICAR, {
            titulo: title,
            texto: messageToSend,
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
