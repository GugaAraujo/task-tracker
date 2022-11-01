<template>
    <section
        :class="applyAnimation ? 'running has-text-weight-medium has-text-success' : ''"
    >
        <i :class="applyAnimation ? 'fas fa-spinner fa-spin' : 'far fa-clock'"></i>
        <span class="time">
            {{ tempoDecorrido }}
        </span>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    canAnimate?: boolean,
    timeInSeconds: number,
}>()
const tempoDecorrido = computed(() => new Date(props.timeInSeconds * 1000).toISOString().substr(11, 8))
const applyAnimation = computed(()=> props.canAnimate && props.timeInSeconds !== 0)

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
}
</style>
