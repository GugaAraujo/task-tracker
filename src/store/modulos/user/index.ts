import http from "@/http";
import IUser from "@/interfaces/IUser";
import { Estado } from "@/store";
import { LOGIN } from "@/store/tipo-acoes";
import { ADD_USER } from "@/store/tipo-mutacoes";
import { Module } from "vuex";
import roteador from "@/roteador";

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
        }
    },
    actions: {
        [LOGIN]({ commit }, user: IUser) {
            return http.post("/users/login", {
                email: user.email,
                password: user.password,
            }).then((response) => {
                const { token } = response.data;
                user.token = token;
                commit((ADD_USER), user)
                localStorage.setItem('token', token);
                roteador.push('/');
            }).catch((err) => {
                console.log(err);
            });
        }
    },
};