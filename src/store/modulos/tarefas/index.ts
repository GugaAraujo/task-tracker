import http from "@/http";
import ITarefa from "@/interfaces/Itarefa";
import { Estado } from "@/store";
import {
    OBTER_TAREFAS,
    CADASTRAR_TAREFAS,
    ALTERAR_TAREFA,
    REMOVER_TAREFA,
} from "@/store/tipo-acoes";
import {
    ADICIONA_TAREFA,
    ALTERA_TAREFA,
    DEFINIR_TAREFAS,
    REMOVE_TAREFA,
} from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    state: {
        tarefas: [];
    };
    tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.unshift(tarefa);
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(
                (cadaTarefa) => cadaTarefa.id == tarefa.id
            );
            state.tarefas[indice] = tarefa;
        },
        [REMOVE_TAREFA](state, id: number) {
            state.tarefas = state.tarefas.filter((tarefa) => tarefa.id != id);
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = `task/all`;
            if (filtro) {
                url = `${url}?filter=${filtro}`;
            }

            http.get(url).then((response) =>
                commit(DEFINIR_TAREFAS, response.data)
            );
        },
        [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefa) {
            return http
                .post("/task/create", tarefa)
                .then((response) => commit(ADICIONA_TAREFA, response.data));
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http
                .put(`/task/edit/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa));
        },
        [REMOVER_TAREFA]({ commit }, tarefa: ITarefa) {
            return http
                .delete(`/task/delete/${tarefa.id}`)
                .then(() => commit(REMOVE_TAREFA, tarefa))
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
