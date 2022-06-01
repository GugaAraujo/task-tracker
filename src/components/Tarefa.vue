<template>
    <Box>
        <div class="columns">
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
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    components: {
        Cromometro,
        Box
    }
})
</script>

