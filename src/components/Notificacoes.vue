<template>
    <div class="notificacoes mr-2" :class="notifications.length ? 'fade-effect' : ''">
        <article class="message"
            :class="contexto[notification.tipo]"
            v-for="notification in notifications"
            :key="notification.id"
        >
            <div class="message-header">
                <p>
                    {{ notification.titulo }}
                </p>
                <button class="delete" @click="closeNotification(notification.id)" aria-label="delete"></button>
            </div>
            <div class="message-body">
                {{ notification.texto }}
            </div>
        </article>
    </div>
</template>
<script setup lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { CLOSE_NOTIFICATION } from '@/store/tipo-acoes';
import { computed } from 'vue'
import { useStore } from '../store'
const contexto = {
    [TipoNotificacao.SUCESSO]: 'is-success',
    [TipoNotificacao.ATENCAO]: 'is-warning',
    [TipoNotificacao.FALHA]: 'is-danger'
};
const store = useStore();
const notifications = computed(() => store.state.notificacoes);

function closeNotification(notificationId) {
    store.dispatch(CLOSE_NOTIFICATION, notificationId);
}
</script>
<style scoped>
.notificacoes{
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 10;
        opacity: 0;
        animation: fade-in .65s ease-in forwards;
}
.fade-effect {
    transform: scale(0);
    border-radius: 50%;
    opacity: 0;
    overflow: hidden;
    animation: scale-in .3s ease-out forwards,
                expand .35s .25s ease-out forwards;
}
@keyframes scale-in {
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
@keyframes expand {
	50% { border-radius: 6px; }
	100% { border-radius: 4px; }
}
@keyframes fade-in {
	0% { opacity: 0; }
	100% { opacity: .8;	}
}
</style>
