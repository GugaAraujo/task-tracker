<template>
  <header>
    <h1 class="brand">Task Tracker</h1>
    <div class="switch-darkmode">
      <p class="mb-2">Dark mode:</p>
      <Toggle v-model="darkMode" class="toggle-blue">
        <template v-slot:label="{ checked, classList }">
          <span :class="classList.label">{{ checked ? "On" : "Off" }}</span>
        </template>
      </Toggle>
    </div>
    <nav>
      <ul>
        <li v-if="user">
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            tarefas
          </router-link>
        </li>
        <li v-if="user">
          <router-link to="/projetos" class="link">
            <i class="fas fa-folder-open"></i>
            projetos
          </router-link>
        </li>
        <li v-if="user">
          <router-link to="/graficos" class="link">
            <i class="fas fa-chart-pie"></i>
            relatórios
          </router-link>
        </li>
        <li v-if="user">
          <router-link to="/logout" class="link">
            <i class="fas fa-chart-pie"></i>
            Sair
          </router-link>
        </li>
        <li v-if="!user">
          <router-link to="/login" class="link">
            <i class="fas fa-tasks"></i>
            Entrar
          </router-link>
        </li>
        <li v-if="!user">
          <router-link to="/register" class="link">
            <i class="fas fa-tasks"></i>
            Cadastrar
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import IUser from "@/interfaces/IUser";
import { useStore } from "@/store";
import Toggle from "@vueform/toggle";
import { computed, ref, watch } from "vue";

const store = useStore();
const user = computed((): IUser[] => store.state.user.user)
const token = localStorage.getItem('token');

const emit = defineEmits(["aoTemaAlterado"])
const darkMode = ref(false);

function changeTheme() {
  emit("aoTemaAlterado", darkMode.value);
}
watch(darkMode, () => {
  changeTheme();
})
</script>

<style lang="scss" scoped>
@import "@vueform/toggle/themes/default.css";
header {
  background-image: linear-gradient(95deg, #0d3b66, #285d90);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 45%),
    0 0 0 1px rgb(10 10 10 / 2%);
  border: 1px solid rgb(44, 78, 137);
  text-shadow: 1px 1px 1px #000;
  width: 100%;
  height: 100vh;
  text-align: center;

  .brand {
    font-size: 45px;
    color: #fff;
    margin-bottom: 5px;
  }

  .switch-darkmode {
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
      margin-top: 18px;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.15);
      }

      i {
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

      ul {
        white-space: nowrap;
      }

      ul li {
        flex-wrap: nowrap;
        font-size: 18px;
        display: inline;
        margin: 1em;
      }
    }
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  header {
    padding: 1rem;

    .brand {
      font-size: 34px;
      margin-bottom: 10px;
    }

    nav {
      margin-top: 20px;

      ul li {
        font-size: 17px;
        margin: 1em;
      }
    }
  }
}
</style>
