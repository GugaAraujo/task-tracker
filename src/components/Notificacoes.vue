<template>
    <div class="notificacoes">
        <article class="message"
            :class="contexto[notification.tipo]"
            v-for="notification in notifications"
            :key="notification.id"
        >
            <div class="message-header">
                <p>
                    {{ notification.titulo }}
                </p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                {{ notification.texto }}
            </div>
        </article>
    </div>
</template>
<script setup lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { computed } from 'vue'
import { useStore } from '../store'
const contexto = {
    [TipoNotificacao.SUCESSO]: 'is-success',
    [TipoNotificacao.ATENCAO]: 'is-warning',
    [TipoNotificacao.FALHA]: 'is-danger'
};
const store = useStore();
const notifications = computed(() => store.state.notificacoes);
</script>
<style scoped>
.notificacoes{
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 10;
}
</style>
