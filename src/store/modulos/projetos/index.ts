import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                name: nomeDoProjeto,
            } as IProjeto;
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(
                (proj) => proj.id == projeto.id
            );
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter((proj) => proj.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get("/project/all").then((response) =>
                commit(DEFINIR_PROJETOS, response.data)
            );
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string) {
            return http.post("/project/create", {
                name: nomeDoProjeto,
            });
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/project/edit/${projeto.id}`, projeto);
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http
                .delete(`/project/delete/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id));
        },
    },
};