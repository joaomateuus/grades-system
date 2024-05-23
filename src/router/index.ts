import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from "../pages/Home.vue";
import Alunos from "../pages/Alunos/index.vue";
import Materias from '../pages/Materias/index.vue';
import Notas from "../pages/Notas/index.vue"
import CreateAluno from '../pages/Alunos/create.vue';
import CreateMaterias from '../pages/Materias/create.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/alunos',
        name: 'Alunos',
        component: Alunos,
    },
    {
        path: '/alunos/create',
        name: 'CreateAluno',
        component: CreateAluno,
    },
    {
        path: '/materias',
        name: 'Materias',
        component: Materias,
    },
    {
        path: '/materias/create',
        name: 'CreateMaterias',
        component: CreateMaterias,
    },
    {
        path: '/notas',
        name: 'Notas',
        component: Notas,
    },
   
];

export const router = createRouter({
    history: createWebHistory('/'),
    routes
});

