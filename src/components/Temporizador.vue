<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :timeInSeconds="timeInSeconds" />
        <Botao @onClicked="startCounting" icon="fas fa-play" text="play" :disabled="!EnabledButtons || isCounting" />
        <Botao @onClicked="stopCounting" icon="fas fa-stop" text="stop" :disabled="!isCounting" />
    </div>
</template>

<script setup lang="ts">
import Cronometro from './Cronometro.vue'
import Botao from './Botao.vue'
import { ref } from 'vue';
defineProps(['EnabledButtons'])
const emit = defineEmits(['onStoppingCounting', 'onCountingTask']);
const timeInSeconds = ref(0);
const chronometer = ref(0);
const isCounting = ref(false);

function startCounting () {
    emit("onCountingTask")
    isCounting.value = true
    chronometer.value = setInterval(()=>{
        timeInSeconds.value++
    }, 1000)
}
function stopCounting () {
    isCounting.value = false
    clearInterval(chronometer.value)
    emit('onStoppingCounting', timeInSeconds.value)
    timeInSeconds.value = 0
}
</script>
