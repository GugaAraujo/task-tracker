<template>
  <div class="modal" :class="{ 'is-active': mostrarModal }" v-if="mostrarModal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho" />
      </header>
      <section class="modal-card-body">
        <div class="corpo">
          <slot name="corpo" />
        </div>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <slot name="rodape" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    mostrarModal: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.corpo {
  margin: 25px auto;
}
</style>