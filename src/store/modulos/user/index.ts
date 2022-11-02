import http from "@/http";
import IUser from "@/interfaces/IUser";
import { Estado } from "@/store";
import { GENERATE_DATA, GET_FIRST_ACCESS, GET_TOKEN, LOGIN, LOGOUT, REGISTER_USER, REMOVE_FIRST_ACCESS } from "@/store/tipo-acoes";
import { ADD_USER, REMOVE_USER, SET_FIRST_ACCESS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";
import roteador from "@/roteador";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export interface UserState {
    state: {
        user: [];
    }
    user: IUser;
}

export const user: Module<UserState, Estado> = {
    mutations: {
        [ADD_USER](state, user: IUser) {
            state.user = user;
        },
        [REMOVE_USER](state) {
            state.user = null;
        },
        [SET_FIRST_ACCESS](state, first_access): void {
            state.user.first_access = first_access;
        }
    },
    actions: {
        async [LOGIN]({ commit }, user: IUser) {

            await http.post("/users/login", {
                email: user.email,
                password: user.password,
            }).then((response) => {
                const { token, username } = response.data;
                const { email } = user;
                commit((ADD_USER), { email, token, username });
                localStorage.setItem('username', username);
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                roteador.push('/');
            })
        },
        async [GET_FIRST_ACCESS]({ commit }): Promise<void> {
            await http.get("/users/first_access").then((response) => {
                commit((SET_FIRST_ACCESS), response.data.data);
            });
        },
        async [GENERATE_DATA]({ commit }, generatedata ): Promise<void> {
            if (generatedata?.generate) {
                await http.put("/users/generate_data")
                    .then(() => roteador.go(0));
            }
            this.dispatch(REMOVE_FIRST_ACCESS);
        },
        async [REMOVE_FIRST_ACCESS]({ commit }): Promise<void> {
            await http.put("/users/remove_first_access").then(() => {
                commit((SET_FIRST_ACCESS), false);
            });
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
            const username = localStorage.getItem('username');
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');
            token
                ? commit((ADD_USER), { email, token, username })
                : roteador.push('/login');
        },
        [LOGOUT]({ commit }) {
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            commit(REMOVE_USER);
        }
    },
};