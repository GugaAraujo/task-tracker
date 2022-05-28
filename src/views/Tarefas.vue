<template>
  <div>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <Tarefa
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
      />
      <Box v-if="listaEstaVazia"> Ainda não contabilizei nada por aqui :( </Box>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Box from "../components/Box.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/Itarefa";

export default defineComponent({
  name: "App",
  components: {
    Box,
    Formulario,
    Tarefa,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },

  },
});
</script>
