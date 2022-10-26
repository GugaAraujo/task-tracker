import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue"

const rotas: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/",
        name: "Tarefas",
        component: () => import("../views/Tarefas.vue"),
    },
    {
        path: "/projetos",
        component: () => import("../views/Projetos.vue"),
        children: [
            {
                path: "",
                name: "Projetos",
                component: () => import("@/views/projetos/Lista.vue"),
            },
            {
                path: "novo",
                name: "Novo projeto",
                component: () => import("@/views/projetos/Formulario.vue"),
            },
            {
                path: ":id",
                name: "Editar projeto",
                component: () => import("@/views/projetos/Formulario.vue"),
                props: true,
            },
        ],
    },
    {
        path: "/graficos",
        name: "Graficos",
        component: () => import("@/views/Graficos.vue"),
    },
    {
        path: "/logout",
        name: "Logout",
        component: {
            beforeRouteEnter(to, from, next) {
                localStorage.removeItem('token');
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
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default roteador;
