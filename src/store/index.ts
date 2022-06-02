import { INotificacao } from "@/interfaces/INotificacao";
import ITarefa from "@/interfaces/Itarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ALTERAR_TAREFA, CADASTRAR_TAREFAS, OBTER_TAREFAS } from "./tipo-acoes";
import {
    ADICIONA_TAREFA,
    ALTERA_TAREFA,
    DEFINIR_TAREFAS,
    NOTIFICAR,
    REMOVE_TAREFA,
} from "./tipo-mutacoes";
import http from "@/http";
import { EstadoProjeto, projeto } from "./modulos/projetos";
// No Vuex 4, além de exportamos o store, precisamos
// exportar também uma chave de acesso

export interface Estado {
    tarefas: ITarefa[];
    notificacoes: INotificacao[];
    projeto: EstadoProjeto;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: [],
        },
    },

    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(
                (cadaTarefa) => cadaTarefa.id == tarefa.id
            );
            console.log("Verificando tarefa: ", tarefa);
            console.log("Verificando no index: ", indice);
            state.tarefas[indice] = tarefa;
        },
        // [REMOVE_TAREFA](state, id: string) {
        //     state.projetos = state.projetos.filter(
        //         (projeto) => projeto.id != id
        //     );
        // },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(
                    (notificacao) => notificacao.id != novaNotificacao.id
                );
            }, 3000);
        },
    },

    actions: {
        [OBTER_TAREFAS]({ commit }) {
            http.get("tarefas").then((response) =>
                commit(DEFINIR_TAREFAS, response.data)
            );
        },
        [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefa) {
            return http
                .post("/tarefas", tarefa)
                .then((response) => commit(ADICIONA_TAREFA, response.data));
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http
                .put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa));
        },
    },
    modules: {
        projeto,
    },
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
