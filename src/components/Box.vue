<template>
    <div class="box has-text-weight-bold"
        :style="estilos"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
    const estilos= {
        background: '#FAF0CA'
    }
</script>
