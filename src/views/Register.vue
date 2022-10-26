<template>
    <div>
        <section>
            <form @submit.prevent="register">
                <div class="field">
                    <label for="login" class="label"> Email </label>
                    <input type="email" class="input" v-model="email" id="email" />
                </div>
                <div class="field">
                    <label for="login" class="label"> Senha </label>
                    <input type="text" class="input" v-model="password" id="password" />
                </div>
                <div class="field">
                    <label for="login" class="label"> Confirme a senha </label>
                    <input type="text" class="input" v-model="confirmPwd" id="password" />
                </div>
                <div class="field">
                    <button class="button" type="submit">Registrar</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref } from "vue";

const email = ref(null);
const password = ref(null);
const confirmPwd = ref(null);

async function register() {
    return http.post("/users/create", {
        email: email.value,
        password: password.value,
        confirmPwd: confirmPwd.value,
        agreeTerms: true,
    }).then(() => {
        this.$router.push('Login')
    }).catch((err) => {
        console.log(err);
    });
}

</script>