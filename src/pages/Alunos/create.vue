<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted, ref } from 'vue';
import { alunos, alunosCounter } from '../../store';
import { data } from 'autoprefixer';
import { createAlunoService } from '../../services/alunos';

const nome = ref<string>("");
const email = ref<string>("");
const data_nascimento = ref<string>("");

const validateForm = () => {
    if (nome.value.length === 0) {
        alert("Preencha o nome")
        return false
    }
    
    if (email.value.length === 0) {
        alert("Preencha o nome")
        return false;
    }
    
    if (data_nascimento.value.length === 0) {
        alert("Preencha o nome")
        return false;
    }
    return true
}

const handleSubmit = async () => {
    try {
        const result = validateForm();
        if (!result) {
            return alert("Informações do aluno estãi inválidas")
        }

        const { data, errors } = await createAlunoService({
            nome: nome.value,
            email: email.value,
            data_nascimento: data_nascimento.value
        })

        return alert("Aluno criado com sucesso");
    } catch (error) {
        console.log(error);
        return alert("Ocorreu um problema ao criar o aluno");
    }
}

onMounted(() => {
    initFlowbite();
})
</script>
<template>
    <div class="flex flex-col items-center justify-start w-full h-screen">
        <div class="flex items-center justify-between h-14 w-full mb-12 p-4">
            <router-link to="/alunos">
                <svg class="w-8 h-8 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>
            </router-link>

            <!-- <span class="text-4xl">Criar Aluno</span> -->
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col items-center justify-start h-full w-full">
            <div class="w-1/2 mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nome
                </label>
                <input v-model="nome"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required />
            </div>
            <div class="w-1/2 mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input v-model="email"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required />
            </div>
            <div class="w-1/2 mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Data de Nascimento
                </label>
                <input type="date" v-model="data_nascimento"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required />
            </div>

            <button type="submit"
                class="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-44 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Criar Aluno
            </button>
        </form>
    </div>
</template>


<style scoped></style>