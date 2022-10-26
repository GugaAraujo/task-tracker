<template>
    <div>
        <section>
            <form @submit.prevent="login">
                <div class="field">
                    <label for="login" class="label"> Email </label>
                    <input type="email" class="input" v-model="email" id="email" />
                </div>
                <div class="field">
                    <label for="login" class="label"> Senha </label>
                    <input type="text" class="input" v-model="password" id="password" />
                </div>
                <div class="field">
                    <button class="button" type="submit">login</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { LOGIN } from "@/store/tipo-acoes";
import { ref } from "vue";

const store = useStore();
const email = ref(null);
const password = ref(null);

async function login() {
    store.dispatch(LOGIN, {
        email: email.value,
        password: password.value,
    });
}

</script>