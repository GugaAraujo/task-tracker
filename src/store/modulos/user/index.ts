import http from "@/http";
import IUser from "@/interfaces/IUser";
import { Estado } from "@/store";
import { GET_TOKEN, LOGIN, LOGOUT, REGISTER_USER } from "@/store/tipo-acoes";
import { ADD_USER, REMOVE_USER } from "@/store/tipo-mutacoes";
import { Module } from "vuex";
import roteador from "@/roteador";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export interface UserState {
    state: {
        user: [];
    }
    user: IUser[];
}

export const user: Module<UserState, Estado> = {
    mutations: {
        [ADD_USER](state, user: IUser[]) {
            state.user = user;
        },
        [REMOVE_USER](state) {
            state.user = null;
        }
    },
    actions: {
        async [LOGIN]({ commit }, user: IUser) {

            await http.post("/users/login", {
                email: user.email,
                password: user.password,
            }).then((response) => {
                const { token } = response.data;
                const { email } = user;
                commit((ADD_USER), { email, token });
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                roteador.push('/');
            })
        },
        async [REGISTER_USER]({ commit }, user) {
            await http.post("/users/create", user)
                .then(() => {
                    commit('NOTIFICAR', {
                        titulo: "E-mail cadastrado",
                        texto: "Você já pode utilizar sua conta.",
                        tipo: TipoNotificacao.SUCESSO,
                    }, { root: true });
                    roteador.push('/login');
                })
        },
        [GET_TOKEN]({ commit }) {
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');
            token
                ? commit((ADD_USER), { email, token })
                : roteador.push('/login');
        },
        [LOGOUT]({ commit }) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            commit(REMOVE_USER);
        }
    },
};