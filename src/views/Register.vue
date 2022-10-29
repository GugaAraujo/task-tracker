<template>
    <div class="mt-2 columns">
        <section class="column is-8 container">
            <form @submit.prevent="register" class="box">
                <div class="field">
                    <label for="register" class="label"> Username </label>
                    <div class="control">
                        <input type="name" class="input" v-model="username" id="username" />
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
                        <input type="password" class="input" v-model="password" id="password" />
                    </div>
                </div>
                <div class="field">
                    <label for="register" class="label"> Confirme a senha </label>
                    <div class="control">
                        <input type="password" class="input" v-model="confirmPwd" id="password" />
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
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { REGISTER_USER } from "@/store/tipo-acoes";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { ref } from "vue";
const store = useStore();

const username = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPwd = ref(null);
const isLoading = ref(false);

async function register() {
    if (password.value === confirmPwd.value) {
        isLoading.value = true;
        store.dispatch(REGISTER_USER, {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPwd: confirmPwd.value,
            agreeTerms: true,
        }).finally(() => {
            isLoading.value = false;
        })
    } else {
        store.commit(NOTIFICAR, {
            titulo: 'Senhas difenrentes',
            texto: 'A confirmação da senha e a senha devem ser iguais',
            tipo: TipoNotificacao.FALHA,
        })
    }
}

</script>