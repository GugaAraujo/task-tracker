<template>
  <header>
    <h1 class="brand">Task Tracker</h1>
    <div class="switch-darkmode">
      <p class="mb-2">Dark mode:</p>
      <Toggle v-model="modoEscuroAtivo" class="toggle-blue">
        <template v-slot:label="{ checked, classList }">
          <span :class="classList.label">{{ checked ? "On" : "Off" }}</span>
        </template>
      </Toggle>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-folder-open"></i>
            projetos
          </router-link>
        </li>
        <li>
          <router-link to="/graficos" class="link">
            <i class="fas fa-chart-pie"></i>
            gráficos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toggle from "@vueform/toggle";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  components: {
    Toggle,
  },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    alterarTema() {
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
  watch: {
    modoEscuroAtivo() {
      this.alterarTema();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@vueform/toggle/themes/default.css";
header {
  padding: 1rem;
  background: #0d3b66;
  text-shadow: 1px 1px 1px #000;
  width: 100%;
  height: 100vh;
  text-align: center;

  .brand {
    font-size: 45px;
    color: #fff;
    margin-bottom: 5px;
  }
  
  .switch-darkmode{
    color: #fff;
    font-size: 14px;
    .toggle-blue {
      --toggle-bg-on: rgb(59, 165, 186);
      --toggle-border-on: rgb(152, 154, 156);
      text-shadow: none;
      &:focus {
        box-shadow: none;
      }
    }
  }

  nav {
    margin-top: 45px;
    display: flex;
    justify-content: center;

    li {
      text-align: left;
      font-size: 18px;
      margin: 18px 0;

      i{
        margin-right: 5px;
      }

      .link {
        color: #fff;
      }
      .link:hover {
        color: #faf0ca;
      }
      .link.router-link-active {
        color: #faf0ca;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2rem;
    height: auto;

    nav {
      margin-top: 25px;

      ul li {
        display: inline;
        margin: 1em;
      }
    }
  }
}
</style>
