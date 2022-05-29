import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

// No Vuex 4, além de exportamos o store, precisamos
// exportar também uma chave de acesso

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()


export const store = createStore<Estado>({
    state: {
        projetos: [],
    },

    mutations: {
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}