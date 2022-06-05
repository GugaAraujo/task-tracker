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
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #0c0e1c;
  --texto-primario: rgb(244, 243, 243);
  .title {
      color: var(--texto-primario); 
  }
}


.conteudo {
  min-height: 600px;
  background-color: var(--bg-primario);
}

</style>
