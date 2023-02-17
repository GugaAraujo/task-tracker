<template>
    <div class="columns">
        <section class="column is-8 container">
            <About />
            <form @submit.prevent="login" class="box">
                <div class="field">
                    <label for="login" class="label"> Email </label>
                    <div class="control">
                        <input class="input" v-model="email" type="email" placeholder="seu@email.com">
                    </div>
                </div>
                <div class="field">
                    <label for="login" class="label"> Senha </label>
                    <div class="control">
                        <input class="input" v-model="password" type="password" placeholder="********">
                    </div>
                </div>
                <div class="field">
                    <button class="button is-info" :class="isLoading ? 'is-loading' : ''" type="submit">Entrar</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { LOGIN } from "@/store/tipo-acoes";
import { ref } from "vue";
import About from "@/components/About.vue";

const store = useStore();
const email = ref(null);
const password = ref(null);
const isLoading = ref(false);

async function login() {
    isLoading.value = true;
    store.dispatch(LOGIN, {
        email: email.value,
        password: password.value,
    }).finally(() => {
        isLoading.value = false;
    });
}

</script>

<style lang="scss" scoped>
.columns {
    margin-left: 0;
    margin-right: 0;

    @media screen and (min-width: 768px) {
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
