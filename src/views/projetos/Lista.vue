<template>
    <section class="box">
        <router-link to="/projetos/novo" class="button is-info">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth mt-4">
            <thead>
                <tr>
                    <th>
                        Nome
                    </th>
                    <th width="40%">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in Allprojects" :key="projeto.id">
                    <td>
                        {{projeto.name}}
                    </td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="exclude(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup lang="ts">
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes'
import { computed } from 'vue'
import { useStore } from '../../store'
import useNotificador from "@/hooks/notificador";
import { TipoNotificacao } from '@/interfaces/INotificacao';

const store = useStore()
const { notificar } = useNotificador();
store.dispatch(OBTER_PROJETOS)
const Allprojects = computed(() => store.state.projeto.projetos);

function exclude (id: string) {
    store.dispatch(REMOVER_PROJETO, id)
        .then(() => notificar(
            TipoNotificacao.SUCESSO,
            'Projeto excluido',
            'O projeto excluido com sucesso',
        ));
}
</script>

<style lang="scss" scoped>
table{
    border-radius: 5px;
}
</style>