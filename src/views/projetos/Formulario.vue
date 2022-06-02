<template>
  <div>
    <section>
      <form @submit.prevent="salvar">
        <div class="field">
          <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
          <input
            type="text"
            class="input"
            v-model="nomeDoProjeto"
            id="nomeDoProjeto"
          />
        </div>
        <div class="field">
          <button class="button" type="submit">Salvar</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { defineComponent, ref } from "vue";
import { useStore } from "../../store";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();

    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => aoSalvarProjeto());
      } else {
        store
          .dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => aoSalvarProjeto());
      }
    };

    const aoSalvarProjeto = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Novo projeto salvo",
        "Seu projeto já está disponível"
      );
      router.push("/projetos");
    };

    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>
