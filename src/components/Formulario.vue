<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Digite um nome para a sua tarefa" v-model="descriptionText"
          :disabled="enabledInputs" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject" :disabled="enabledInputs">
            <option value="">Selecione o projeto</option>
            <option v-for="project in allProjects" :value="project.id" :key="project.id">
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @onStoppingCounting="finishTask" @onCountingTask="changeInputLock"
          :EnabledButtons="checkValues()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "../store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

const emit = defineEmits(["onSaveTask"]);
const store = useStore(key);
const allProjects = computed(() => store.state.projeto.projetos);
const descriptionText = ref("");
const idProject = ref("");
let EnabledButtons = ref(false);
let enabledInputs = ref(false);

function changeInputLock (): boolean {
  return enabledInputs.value = !enabledInputs.value
}
function checkValues (): boolean {
  if(descriptionText.value && idProject.value){
    return EnabledButtons.value = true
  }
}
function cleanInputs(): void {
  descriptionText.value = '';
  idProject.value = '';
}
function finishTask (tempoDecorrido: number): void {
  changeInputLock()
  const project = allProjects.value.find((p) => p.id == idProject.value);
  if (!project) {
    store.commit(NOTIFICAR, {
      titulo: "Ops!",
      texto: "Selecione um projeto antes de finalizar a tarefa!",
      tipo: TipoNotificacao.FALHA,
    });
    return;
  }
  emit("onSaveTask", {
    duration: tempoDecorrido,
    description: descriptionText.value,
    project_name: project.name,
    project_id: project.id,
  });
  cleanInputs();
}


</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>