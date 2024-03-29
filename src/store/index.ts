import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR, REMOVE_NOTIFICATION } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

import { EstadoProjeto, projeto } from "./modulos/projetos";
import { EstadoTarefa, tarefa } from "./modulos/tarefas";
import { UserState, user } from "./modulos/user";
import { CLOSE_NOTIFICATION } from "./tipo-acoes";

export interface Estado {
    notificacoes: INotificacao[];
    projeto: EstadoProjeto;
    tarefa: EstadoTarefa;
    user: UserState;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: [],
        },
        tarefa: {
            tarefas: [],
        },
        user: {
            user: [],
        },
    } as unknown as Estado,

    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(
                    (notificacao) => notificacao.id != novaNotificacao.id
                );
            }, 4000);
        },
        [REMOVE_NOTIFICATION](state, notificationId: number) {
            state.notificacoes = state.notificacoes.filter(
                (notification) => notification.id != notificationId
            );
        },
    },
    actions: {
        [CLOSE_NOTIFICATION]({ commit }, notificationId: number) {
            commit(REMOVE_NOTIFICATION, notificationId);
        },
    },
    modules: {
        projeto,
        tarefa,
        user,
    },
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
