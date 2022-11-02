<template>
  <notificacoes />
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': darkMode }"
  >
    <div class="column is-one-fifth menu">
      <BarraLateral @aoTemaAlterado="changeTheme" />
    </div>
    <div class="column auto conteudo ">
      <router-view></router-view>
      <Modal :showModal="firtsAccess">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Seja bem vindo!</p>
          <button @click="removeFirstAccess" class="delete" aria-label="close"></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <p class="mb-5">Oi, {{ user?.username }}!</p>
            <span>Fico feliz que tenha vindo conhecer este projeto de estudo. </span>
            <span>Aceita carregar alguns dados de exemplo para testar as possibilidades?</span>
          </div>
        </template>
        <template v-slot:rodape>
          <button @click="removeFirstAccess({ generate: true } )" class="button is-success">
            Carregar dados de exemplo
          </button>
          <button @click="removeFirstAccess" class="button">Não, eu prefiro descobrir sozinho</button>
        </template>
      </Modal>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Modal from "./components/Modal.vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue";
import { useStore } from "./store";
import { GENERATE_DATA, GET_TOKEN } from "./store/tipo-acoes";

const store = useStore();
store.dispatch(GET_TOKEN);
const firtsAccess = computed(() => store.state.user.user?.first_access || false);
const user = computed(() => store.state.user.user);

let darkMode = ref(false);
function changeTheme(changedTheme: boolean): void {
  darkMode.value = changedTheme;
}

const removeFirstAccess = ({ generate = false }): void => {
  store.dispatch(GENERATE_DATA, { generate });
};

</script>

<style lang="scss">
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: hsl(0, 0%, 96%);
  --bg-secundario: hsl(0, 0%, 96%);
  --texto-primario: #000;

  width: 100%;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 2000px;

}
main.modo-escuro {
  --bg-primario: #2b3f6f;
  --bg-secundario: #1e2c5f;
  --texto-primario: rgb(244, 243, 243);
  .title {
    color: var(--texto-primario);
  }
}

.menu {
  position: sticky;
  display: inline-block;
  vertical-align: top;
  max-height: 100vh;
  overflow-y: auto;
  top: 0;
  bottom: 0;
}

.conteudo {
  display: inline-block;
  min-height: 600px;
  max-height: 100vh;
  background-image: linear-gradient(
    10deg,
    var(--bg-primario), 65%,
    var(--bg-secundario)
  );
 overflow-y: scroll;
}


@media only screen and (max-width: 768px) {
.menu {
  position: unset;
  display: block;
  max-height: 100vh;
  overflow-y: auto;
  top: 0;
  bottom: 0;
}

.conteudo {
  display: block;

  min-height: 600px;
  max-height: 100vh;
  background-image: linear-gradient(
    10deg,
    var(--bg-primario), 65%,
    var(--bg-secundario)
  );
 overflow-y: scroll;
}
}
</style>
