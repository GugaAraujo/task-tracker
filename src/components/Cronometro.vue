<template>
    <section>
        <i class="far fa-clock"></i>
        <span class="time" :class="isRunning ? 'running' : ''">
            {{ tempoDecorrido }}
        </span>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
    name:'Cronometro',
    props:{
        timeInSeconds:{
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isRunning: false
        }
    },
    watch:{
        timeInSeconds(newValue){
            newValue > 0
            ? this.isRunning = true
            : this.isRunning = false
        }
    },
    computed: {
        tempoDecorrido (): string {
            return new Date(this.timeInSeconds * 1000 ).toISOString().substr(11,8)
        }
    },
})
</script>

<style scoped>
.display {
    color: var(--texto-primario)
}

.time {
    position: relative;
    left: 9px;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    i {
        display: none;
    }

    .time {
        left: -10px;
    }

    .running {
        color: rgb(72, 197, 72);
    }
}
</style>
