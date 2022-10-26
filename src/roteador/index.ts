import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue"
import { store } from "./../store";
import { LOGOUT } from "./../store/tipo-acoes";

const rotas: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        meta: { onlyGuest: true },
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        meta: { onlyGuest: true },
        component: Register,
    },
    {
        path: "/tarefas",
        name: "Tarefas",
        meta: { requireAuth: true },
        component: () => import("../views/Tarefas.vue"),
    },
    {
        path: "/projetos",
        component: () => import("../views/Projetos.vue"),
        meta: { requireAuth: true },
        children: [
            {
                path: "",
                name: "Projetos",
                meta: { requireAuth: true },
                component: () => import("@/views/projetos/Lista.vue"),
            },
            {
                path: "novo",
                name: "Novo projeto",
                meta: { requireAuth: true },
                component: () => import("@/views/projetos/Formulario.vue"),
            },
            {
                path: ":id",
                name: "Editar projeto",
                meta: { requireAuth: true },
                component: () => import("@/views/projetos/Formulario.vue"),
                props: true,
            },
        ],
    },
    {
        path: "/",
        name: "Graficos",
        meta: { requireAuth: true },
        component: () => import("@/views/Graficos.vue"),
    },
    {
        path: "/logout",
        name: "Logout",
        component: {
            beforeRouteEnter(to, from, next) {
                store.dispatch(LOGOUT);
                next('/login');
            },
        },
    },
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas,
});
roteador.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!store.state.user.user) {
            next({ name: 'Login' });
        }
        else {
            next();
        }
    }
    else if (to.matched.some(record => record.meta.onlyGuest)) {
        if (store.state.user.user) {
            next({ name: "Graficos" });
        } else {
            next();
        }
    }
    else {
        next();
    }
})

export default roteador;
