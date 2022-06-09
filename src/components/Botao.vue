<template>
    <button class="button"
        @click="clicado"
        :disabled="desabilitado"
    >
        <span class="icon">
            <i :class="icone"></i>
        </span>
        <span class="text-button">
            {{ texto }}
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Botao',
  emits: ['clicado'],
  props: {
      desabilitado: {
          type: Boolean
      },
      icone: {
          type: String,
          required: true
      },
      texto: {
          type: String,
          required: true
      }
  },
  methods: {
      clicado () : void {
          this.$emit('clicado')
      }
  }
})
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
