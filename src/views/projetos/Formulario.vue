<template>
  <div>
    <section>
      <form @submit.prevent="saveProject">
        <div class="field">
          <label for="projectName" class="label"> Nome do Projeto </label>
          <input type="text" class="input" v-model="projectName" id="projectName" />
        </div>
        <div class="field">
          <button class="button" type="submit">Salvar</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { ref } from "vue";
import { useStore } from "../../store";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const props = defineProps<{
  id: string
}>()

const { notificar } = useNotificador();
const projectName = ref("");
if (props.id) {
  const projeto = store.state.projeto.projetos.find(
    (proj) => proj.id == props.id
  );
  projectName.value = projeto?.name || "";
}

function saveProject () {
  if (props.id) {
    store
      .dispatch(ALTERAR_PROJETO, {
        id: props.id,
        name: projectName.value,
      })
      .then(() => onSaveProject());
  } else {
    store
      .dispatch(CADASTRAR_PROJETOS, projectName.value)
      .then(() => onSaveProject());
  }
}
function onSaveProject () {
  projectName.value = "";
  notificar(
    TipoNotificacao.SUCESSO,
    "Novo projeto salvo",
    "Seu projeto já está disponível"
  );
  router.push("/projetos");
}
</script>
