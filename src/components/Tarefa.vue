<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || "N/D" }}
            </div>
            <div class="column">
                <Cromometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ITarefa from '../interfaces/Itarefa'
import Cromometro from './Cronometro.vue'
import Box from './Box.vue'

export default defineComponent({
    name: 'Terefa',
    emits: ['aoTarefaClicada'],
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada () : void {
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    },
    components: {
        Cromometro,
        Box
    }
})
</script>

<style scoped>
.clicavel {
    cursor: pointer;
}
</style>

