<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    
    <Botao @clicado="iniciar" icone="fas fa-play" texto="play" :disabled="!botoesHabilitados || cronometroRodando" />
    <Botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :disabled="!cronometroRodando" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from './Cronometro.vue'
import Botao from './Botao.vue'

export default defineComponent({

    name: 'Temporizador',
    props: {
       botoesHabilitados:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    emits:['aoTemporizadorFinalizado','rodandoTarefa'],
    components: {
        Cronometro,
        Botao
    },
    data () {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar () {
            this.$emit("rodandoTarefa")
            this.cronometroRodando = true
            this.cronometro = setInterval(()=>{
                this.tempoEmSegundos++
            }, 1000)

        },
        finalizar () {
            this.cronometroRodando = false
           clearInterval(this.cronometro)
           this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
           this.tempoEmSegundos = 0
        }
    },
});
</script>
