<template>
  <Box>
    <div class="rows is-mobile">
      <div class="row">
        <div class="columns is-mobile">
          <div class="column is-11">
            {{ tarefa.descricao || "Tarefa sem descrição" }}
          </div>
          <div class="column is-1" @click="tarefaClicada">
            <i class="fas fa-edit"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns is-mobile">
          <div class="column is-6">
            {{ tarefa.projeto?.nome || "N/D" }}
          </div>
          <div class="column is-5">
            <Cromometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
          </div>
          <div class="column is-1" @click="aoExcluirTask">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ITarefa from "../interfaces/Itarefa";
import Cromometro from "./Cronometro.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "Terefa",
  emits: ["aoTarefaClicada", "aoExcluirTask"],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  methods: {
    tarefaClicada(): void {
      this.$emit("aoTarefaClicada", this.tarefa);
    },
    aoExcluirTask(): void {
      this.$emit("aoExcluirTask", this.tarefa);
    },
  },
  components: {
    Cromometro,
    Box,
  },
});
</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.3);
    color: hsl(348, 100%, 61%);
  }
}
</style>

