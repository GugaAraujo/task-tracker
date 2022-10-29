<template>
  <div>
    <section>
      <form @submit.prevent="saveProject">
        <div class="field">
          <label for="projectName" class="label"> Nome do Projeto </label>
          <input type="text" class="input" v-model="projectName" id="projectName" />
        </div>
        <div class="field">
          <button class="button is-info" :disabled="disabled" type="submit">Salvar</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { computed, ref } from "vue";
import { useStore } from "../../store";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const isLoading = ref(false);
const props = defineProps<{
  id: string
}>()

const { notificar } = useNotificador();
const projectName = ref("");

const disabled = computed(() => isLoading.value || projectName.value.length === 0)

if (props.id) {
  const projeto = store.state.projeto.projetos.find(
    (proj) => proj.id == props.id
  );
  projectName.value = projeto?.name || "";
}

function saveProject() {
  isLoading.value = true;
  if (props.id) {
    store
      .dispatch(ALTERAR_PROJETO, {
        id: props.id,
        name: projectName.value,
      })
      .then(() => onSaveProject('Edição salva', 'Projeto renomeado com sucesso'));
  } else {
    store
      .dispatch(CADASTRAR_PROJETOS, projectName.value)
      .then(() => onSaveProject('Novo projeto', 'Seu projeto já está disponível'));
  }
}
function onSaveProject (notificationTilte: string, notificationSubtitle: string) {
  projectName.value = '';
  isLoading.value = false;
  notificar(
    TipoNotificacao.SUCESSO,
    notificationTilte,
    notificationSubtitle,
  );
  router.push("/projetos");
}
</script>
