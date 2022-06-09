<template>
  <div>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista container is-fluid">
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Filtrar por título"
            v-model="filtro"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <Box v-if="listaEstaVazia"> Ainda não contabilizei nada por aqui :( </Box>
      <Tarefa
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        @aoExcluirTask="abrirModalExcluirTask"
        @aoTarefaClicada="selecionarTarefa"
      />
      <Modal :mostrarModal="tarefaSelecionada != null">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editando uma tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <label for="descricaoDaTarefa" class="label"> Descrição </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoDaTarefa"
            />
          </div>
        </template>
        <template v-slot:rodape>
          <button @click="alterarTarefa" class="button is-success">
            Salvar alterações
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </template>
      </Modal>
      <Modal :mostrarModal="taskAhSerExcluida != null">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Exclusão de tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </template>
        <template v-slot:corpo>
          <div class="field has-text-centered">
            <p>
              Desja excluir a tarefa 
                <span class="has-text-weight-medium">
                  {{ taskAhSerExcluida.descricao }}
                </span>
              ?
            </p>
          </div>
        </template>
        <template v-slot:rodape>
          <button
            @click="deletarTask()"
            class="button is-danger"
          >
            Deletar task
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFAS,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_TAREFA,
} from "@/store/tipo-acoes";
import { computed, defineComponent, ref, watchEffect } from "vue";
import Box from "../components/Box.vue";
import Modal from "../components/Modal.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/Itarefa";
import { useStore } from "../store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "App",
  components: {
    Box,
    Formulario,
    Tarefa,
    Modal,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
      taskAhSerExcluida: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    abrirModalExcluirTask(tarefa: ITarefa) {
      this.taskAhSerExcluida = tarefa;
    },
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
      this.taskAhSerExcluida = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
    atualziarTasks(){
      this.store.dispatch(OBTER_TAREFAS);
      this.fecharModal()
    },
    deletarTask() {
      try {
        this.store
          .dispatch(REMOVER_TAREFA, this.taskAhSerExcluida)
          .then(() => this.atualziarTasks());
      } catch (error) {
        this.fecharModal();
        this.store.commit(NOTIFICAR, {
          titulo: "Ops!",
          texto: "Falha ao deletar",
          tipo: TipoNotificacao.FALHA,
        });
        throw new Error();
      }
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    const filtro = ref("");

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro,
    };
  },
});
</script>
