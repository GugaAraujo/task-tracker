<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter menu">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <notificacoes />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    Notificacoes,
  },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    trocarTema(modoEscuroAtivo: boolean): void {
      console.log(modoEscuroAtivo, this.modoEscuroAtivo);
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style lang="scss">
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --bg-secundario: #fff;
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
