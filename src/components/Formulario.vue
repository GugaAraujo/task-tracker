<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Digite um nome para a sua tarefa"
          v-model="descricao"
          :disabled="inputHabilitados"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto"
            :disabled="inputHabilitados"
          >
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador
          @aoTemporizadorFinalizado="finalizarTarefa"
          @rodandoTarefa="alternaBloqueioInputs"
            :botoesHabilitados="confereValores()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "../store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "Formulario",
  emits: ["aoSalvarTarefa"],
  components: {
    Temporizador,
  },
  setup(props, { emit }) {
    const store = useStore(key);
    const projetos = computed(() => store.state.projeto.projetos);
    const descricao = ref("");
    const idProjeto = ref("");
    let botoesHabilitados = ref(false);
    let inputHabilitados = ref(false);

    const alternaBloqueioInputs = () : boolean => {
      return inputHabilitados.value = !inputHabilitados.value
    }

    const confereValores = () : boolean => {
      if(descricao.value && idProjeto.value){
        return botoesHabilitados.value = true
      }
    }

    const finalizarTarefa = (tempoDecorrido: number): void => {
      alternaBloqueioInputs()
      const projeto = projetos.value.find((p) => p.id == idProjeto.value);

      if (!projeto) {
        store.commit(NOTIFICAR, {
          titulo: "Ops!",
          texto: "Selecione um projeto antes de finalizar a tarefa!",
          tipo: TipoNotificacao.FALHA,
        });
        return;
      }

      emit("aoSalvarTarefa", {
        duration: tempoDecorrido,
        description: descricao.value,
        project_name: projeto.name,
        project_id: projeto.id,
      });

      descricao.value = "";
      idProjeto.value = ""
    };

    return {
      projetos, //computed permitirá que o estado seja computado
      store,
      descricao,
      idProjeto,
      inputHabilitados,
      finalizarTarefa,
      confereValores,
      alternaBloqueioInputs
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>

function ref(arg0: string) {
  throw new Error("Function not implemented.");
}
