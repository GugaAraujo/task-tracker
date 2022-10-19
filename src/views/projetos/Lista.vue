<template>
    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth mt-4">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Nome
                    </th>
                    <th>
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in Allprojects" :key="projeto.id">
                    <td>
                        {{projeto.id}}
                    </td>
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

const store = useStore()
store.dispatch(OBTER_PROJETOS)
const Allprojects = computed(() => store.state.projeto.projetos);

function exclude (id: string) {
    store.dispatch(REMOVER_PROJETO, id);
}
</script>

<style lang="scss" scoped>
table{
    border-radius: 5px;
}
</style>