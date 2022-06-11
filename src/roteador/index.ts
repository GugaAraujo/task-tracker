import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "../views/Tarefas.vue"

const rotas: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Tarefas",
        component: Tarefas,
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
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas,
});

export default roteador;
