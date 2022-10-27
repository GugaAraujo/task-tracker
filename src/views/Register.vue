<template>
    <div class="mt-2 columns">
        <section class="column is-8 container">
            <form @submit.prevent="register" class="box">
                <div class="field">
                    <label for="register" class="label"> Nome </label>
                    <div class="control">
                        <input type="name" class="input" v-model="name" id="name" />
                    </div>
                </div>
                <div class="field">
                    <label for="register" class="label"> Email </label>
                <div class="control">
                    <input type="email" class="input" v-model="email" id="email" />
                </div>
                </div>
                <div class="field">
                    <label for="register" class="label"> Senha </label>
                    <div class="control">
                        <input type="text" class="input" v-model="password" id="password" />
                    </div>
                </div>
                <div class="field">
                    <label for="register" class="label"> Confirme a senha </label>
                    <div class="control">
                        <input type="text" class="input" v-model="confirmPwd" id="password" />
                    </div>
                </div>
                <div class="field">
                    <button class="button is-info" :class="isLoading ? 'is-loading' : ''" type="submit">Registrar</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref } from "vue";

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPwd = ref(null);
const isLoading = ref(false);

async function register() {
    isLoading.value = true;
    return http.post("/users/create", {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPwd: confirmPwd.value,
        agreeTerms: true,
    }).then(() => {
        this.$router.push('Login')
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        isLoading.value = false;
    });
}

</script>