<template>
  <PagePlaceHolder v-if="isLoading" />
  <div v-else>
    <Formulario @onSaveTask="saveTask" />
    <div class="lista container is-fluid">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Filtrar por título" v-model="filter" />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <Box v-if="listaEstaVazia"> ... Não encontrei nada por estas bandas.</Box>
      <div class="columns is-multiline flex">
        <div
          class="mt-2 column is-6 has-text-weight-bold"
          v-for="(tarefa, index) in allTasks" :key="index"
        >
          <Tarefa :task="tarefa" @onClickToExclude="openModalToExclude"
            @onClickToEdit="selectTask" />
        </div>

      </div>
      <Modal :showModal="taskToUpdate != null">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="closeModal" class="delete" aria-label="close"></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <label for="descricaoDaTarefa" class="label"> Descrição </label>
            <input type="text" class="input" v-model="taskToUpdate.description" id="descricaoDaTarefa" />
          </div>
        </template>
        <template v-slot:rodape>
          <button @click="updateTask" class="button is-success">
            Salvar alterações
          </button>
          <button @click="closeModal" class="button">Cancelar</button>
        </template>
      </Modal>
      <Modal :showModal="taskToExclude != null">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Exclusão de tarefa</p>
          <button @click="closeModal" class="delete" aria-label="close"></button>
        </template>
        <template v-slot:corpo>
          <div class="field has-text-centered">
            <p>
              Deseja excluir a tarefa
              <span class="has-text-weight-medium">
                {{ taskToExclude.description }}
              </span>
              ?
            </p>
          </div>
        </template>
        <template v-slot:rodape>
          <button @click="deleteTask()" class="button is-danger">
            Deletar task
          </button>
          <button @click="closeModal" class="button">Cancelar</button>
        </template>
      </Modal>
    </div>
  </div>

</template>

<script setup lang="ts">
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFAS,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_TAREFA,
} from "@/store/tipo-acoes";
import { computed, ref, watchEffect } from "vue";
import Box from "../components/Box.vue";
import Modal from "../components/Modal.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/Itarefa";
import { useStore } from "../store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import PagePlaceHolder from "@/components/placeholders/PagePlaceHolder.vue";

const store = useStore();
const filter = ref("");
let taskToUpdate = ref(null);
let taskToExclude = ref(null);
let isLoading = ref(true);
const allTasks = computed((): ITarefa[] => store.state.tarefa.tarefas);
const listaEstaVazia = computed((): boolean => store.state.tarefa.tarefas?.length === 0);

watchEffect(() => {
  store.dispatch(OBTER_TAREFAS, filter.value);
});

store.dispatch(OBTER_TAREFAS)
  .then(() => isLoading.value = false);
store.dispatch(OBTER_PROJETOS);

const notification = (notificationTilte: string, notificationSubtitle:string): void => {
  store.commit(NOTIFICAR, {
    titulo: notificationTilte,
    texto: notificationSubtitle,
    tipo: TipoNotificacao.SUCESSO,
  });
}

const deleteTask = (): void => {
  store
    .dispatch(REMOVER_TAREFA, taskToExclude.value)
    .then(() => {
      notification('Tarefa excluída','Tarefa excluída com sucesso')
      getTasks()
    });
};
const closeModal = (): void => {
  taskToUpdate.value = null;
  taskToExclude.value = null;
};
const getTasks = (): void => {
  store.dispatch(OBTER_TAREFAS);
  closeModal();
};
const selectTask = (tarefa: ITarefa): void => {
  taskToUpdate.value = tarefa;
};
const updateTask = (): void => {
  store
    .dispatch(ALTERAR_TAREFA, taskToUpdate.value)
    .then(() => {
      notification('Tarefa editada', 'Tarefa editada com sucesso')
      closeModal()
    });
};
const openModalToExclude = (tarefa: ITarefa): void => {
  taskToExclude.value = tarefa;
};
const saveTask = (tarefa: ITarefa): void => {
  store.dispatch(CADASTRAR_TAREFAS, tarefa)
    .then(() => {
      notification('Nova tarefa', 'Sua tarefa já está disponível')
    });
};
</script>
