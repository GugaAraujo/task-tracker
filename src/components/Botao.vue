<template>
    <button
        :class="colorWhenActive && !disabled ? colorWhenActive : ''"
        class="button"
        @click="onClicked"
        :disabled="disabled"
    >
        <span class="icon">
            <i :class="icon"></i>
        </span>
        <span class="text-button">
            {{ text }}
        </span>
    </button>
</template>
<script setup lang="ts">
const emit = defineEmits(['onClicked']);
defineProps({
    disabled: Boolean,
    icon: String,
    text: String,
    colorWhenActive: String,
})
function onClicked (): void {
    emit('onClicked')
}
</script>
<style lang="scss">
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    .button {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: center;

        .text-button {
            display: none;
        }
        i {
            position: relative;
            left: 7px;;
        }
    }
}
</style>
