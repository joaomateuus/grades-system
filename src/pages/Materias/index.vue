<script setup lang="ts">
import { Materia } from '../../interfaces/Materias';
import { onMounted, ref } from 'vue';
import { deleteMateriaService, getMateriasService, updateMateriaService } from '../../services/materias';

const materias = ref<Materia[]>([]);
const editing = ref<boolean>(false);

const fetchMaterias = async () => {
    try {
        const { data, errors } = await getMateriasService();
        if (data) {
            materias.value = data
        }
    } catch (error) {
        console.log(error);
        alert("Não foi possivel buscar as materias")
    }
}

const updateMateria = async (materia: Materia) => {
    try {
        const { data, errors } = await updateMateriaService(materia);
        if (!errors) {
            editing.value = false;
            fetchMaterias();
            alert("Aluno atualizado com sucesso");
        }
    } catch (error) {
        console.log(error);
        alert("Erro ao atualizar o aluno");
    }
}

const deleteMateria = async (id: number) => {
    try {
        const { data, errors } = await deleteMateriaService(id);
        if (!errors) {
            fetchMaterias()
            alert("Materia deletada com sucesso");
        }
    } catch (error) {
        console.log(error);
        alert("Não foi possivel deletar a materia");
    }
}

onMounted(() => {
    fetchMaterias();
})

</script>


<template>
    <div class="flex flex-col items-center justify-start w-full h-screen">
        <div class="flex justify-center items-center h-44 w-full">
            <div class="flex items-center justify-between w-full">
                <span class="text-black text-4xl">Materias</span>
                <button type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <router-link to="/materias/create">
                        Criar Materia
                    </router-link>
                </button>
            </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Disciplina
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Professor Responsável
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody v-for="materia in materias">
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <span v-if="!editing">{{ materia.nome_disciplina }}</span>
                            <input class="rounded-md" v-else v-model="materia.nome_disciplina" type="text">
                        </td>
                        <td class="px-6 py-4">
                            <span v-if="!editing">{{ materia.professor_responsavel }}</span>
                            <input class="rounded-md" v-else v-model="materia.professor_responsavel" type="text">
                        </td>
                        <td v-if="!editing"
                            class="flex w-full items-center justify-evenly font-medium text-blue-600 dark:text-blue-500 hover:underline mt-2 ">
                            <img class="h-4 w-4 m-2" @click="editing = !editing"
                                src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="">
                            <img @click="deleteMateria(materia.id)" class="h-4 w-4 m-2"
                                src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" alt="">
                        </td>
                        <td class="flex justify-evenly w-full px-6 py-4" v-else>
                            <span
                                @click="updateMateria({ id: materia.id, nome_disciplina: materia.nome_disciplina, professor_responsavel: materia.professor_responsavel })"
                                class="text-sm">
                                <img class="h-6 w-6" src="https://cdn-icons-png.freepik.com/512/5610/5610944.png"
                                    alt="">
                            </span>
                            <span @click="editing = false" class="text-sm">
                                <img class="h-6 w-6"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX/AAD/////oKD/9/f/6ur/7e3/+vr/Ly//Ojr/5+f/c3P/7+//enr/LCz/o6P/hIT/3Nz/tbX/fn7/19f/39//Q0P/y8v/h4f/9PT/jIz/rq7/IyP/aGj/nZ3/Nzf/kJD/vb3/V1f/Gxv/b2//SEj/sLD/U1P/wsL/wMD/Dg7/YmL/VVX/ycn/a2v/Pz//l5e+xllDAAALRklEQVR4nOWda2OiOhCGiRdaa6VS1FJbt2itrvb2///dARVByWUyMwHd837epXnMJJlMJhNPuJcfR8k0CFqpgiCYTsMwWU+iUb/d9n33f91z+XG/F00ftn88tV7Gr4/TYddlI5wRdiczLVtZi+V9GLnqTieEcfL4AoQraTyLXDSGnTCePN/a0+V6/+hxN4iXsL++R3TeqZbPvF3JSfj1vqDi7XU7Y+xJNsLh04YHb6/lR8zUMB7COFxx4u31PmFpGwdh7408+ORaJQxLCJ1wdOcGb6ebgMxIJZxsHfLt9EycdWiEkXO+HSPJq6MQ9u7r4Eu1mBFsFU8YP9XEl+klrJ0wbrEuf2b9rOslTG7q5cu0HdVH2He5QKi1adVFGNZsoIV+hnUQ9r6b4sv023ZOOGXaP2C1tPVWLQn7tSzxer25JJw4crHtNO84IwyaZjtoYGOpFoR+XU4aQFMXhKNx01hl3YFDAGDCpLFFUK4fqIcDJbyUIVjoBRiSAxL+Ns0j0eaLkfCxaRq5QFsqCKH/3jSKSpApFUAYvzYNotaMg7DrIBTKp2c6Yf+naQi9nqiE7XnTCCb9Egkb3QzCFJAIL8gVVUu/aOgJ6wwYEqQNw2kJZ003HaiNbjelI5w23XKwFpoIlYZw0nS7LXSj3kypCTuDpptto1cE4cUvhKdS+m9Kwremm2wr1V5KRZg03WBrLRQnqQrCYcNxX4xW8kNGOaF/4e62XA8WhA9NNxanv2DCa1oJy7rpAwnbFxUZtZHMTmWEV7dQFJI4qBLCqOlmEjSoHi9KCAnpoc2rGrepEl5i8NdCFTutEF6zjWYan9tphfACDnlpOo8SnxN+Nd1AshaxnnDZdAPp+tUShk03j0MdDaF/Vft6lR41hC3ap+fB34D8G62ma2rW+FBJ2Cclk2x2kdmYeNa4mwp9muP4rSR8pnx2nP9ylCDkn/zoOqE05WTZLxN2KR9dFTuXNTqpYVlMEhNKlGGuIKT4a9uyKxEhW7cqL2URZUSXEjVKhD7hi3enMZIRqnXbU4erB73cJ2uPlJAwkVZ2nj0E4vt5JKlD2OUUgbeCkLAWPoqK7DvgrvqRDt7DKnZRBeFf9NckgPaIEsB07kPH/BbHia8gREfxpYBp66xs7F7+kQ4a8bjFOBKi94V3qtseNsNIAZiaAvZSwLJCiD3unauvs/TAiAozyDTE+lm575AT+sglbKnLgoT2ojxYfdAE6T/kv1pOuMZ95o8+IRk2FrWA+CnQPyVEBi9MGZCQXjQAon2tjxPCGPcRc1qZeSxqxmCuT1Tj5ieEH6hvvABSkU2GauxBgR1Cm06ZELcYzgGtE33t0g8BFF3cNBiWCDu4+UqdHlCWbiwCTDRVjFsxtiVCZAAKYqUZorIXQT2Inui9fkGITQI2pj7u1Vf0IvC/o0/7wiNhG72tgCWTK6YbYA/is+vujoRD7Ce8F+CtB9lYhALi4z6bIyEhQ8/g1BxV7UUoIH5Xt98H7wgp4ckx8HrO+VgEjkFaTsH0QEgJ0HjeJ/BW52kvQnswIl1G2h4IsZNx/hlgOYAyIhRwRLvwuDkQUjOBX4GIRdo/1ESJgLudQUZIToCC+TbFWAQDkm/9h3tC6mc0QYgz7SNLUBPFhCTP9LgjxK+GhaCIWS9CexAdoilpuSNM6B9SBAMliv/UCZgFFT2uKwdQRFnqmTPA7CjRw+6gK4Iaaq2A3kdKiHe7zwTtxToB00HviRHTtzgR2QC995SQMYOGy1AZlolcy5SQ85Y2D2KHs7yP7/He3uIwVMYeTBV7zBfw6Ih8Y3CnyOO+Q0k1VO7LSIlH2v7KRENk7sF0E+zRdxbnohgqO6DX8hyksuF7kR8wI3RQNggWya6KdZk4KCV0UZUF14u8y8RBLa/t4Ks4RAcm6rkjRBhq101uqzNCa8Suo0qM7ggtDdXJGMzkkNAK0cUsupdLQgtDdTQGMzklhFdVYwqkyOSU0FwdJ5fqCJVBLgmhYcMdorOLxw4JoZHtvewyGS3kjtCmB132ojNCW0BnYzH1vJ18185E98InBOvkaG+BAXQ0Ft3sD+1NdC8XhpoS8vtLuB501IstT7CXF8AD0q5YyJUScntMFEAHvThlj5dix2AufbKmvRLumDetBzMxG2rEfG6BjbKdILL2Ysx79kTvwUyci8bG9ziL0fAAsk432flhj+1rHCa6F/y2jUl32Tk+15LP1YOZ2Kab5ywXg6n0HCcgn6GGGSHpBvdRUBPtANP8mHpxlBFSknCPggL2X6D/kmUs7nOiOPLaoCaanfBC46gcvbja5ybSd4jgbMPdrAbOZKQv/fvcRPruAnrqmwd+6zPUkCdHGAx4XJfAiNRY+CFHmJgV9Y5oLtRQiWeKeZ43LRgFTWQ/bSwUkZbpnefqk9b8FfAywnmeDNRQSdcRgpyQUC9Ce9O5pKq5QXuRsjMY5YT4BMwb4BOasvEEnaASdOuKe0945xv48JJ8woD2IrrgUHF3TWBf+zO9S3CQ6oQXiOhjC4AU9w9FgvvCADYI1asa0FCxQ7F0h9TpPWDdmgZDZLgHjCw4MIc0T59OCTLUDv0uN/Kq8wJwecLklUAQE1TrTu/jI08RzTON2bM0GypyppmLMqFAvnhkWi0gfqUREblanNbFwN6yHOhXfJjjbDBUbLXKs9om2GPEsW4oQncG2l7E7nzO69Og41Eazxu+9dEgYqvbVWoM4aM1yt2Tzd7uW/UR9O5pnH+hqPWFLiBcqSRnD6jcRuN3wMdXoApC/I1uKaJtYUHpdWl8YUFZvTaBj2xJhtHQOsIiQezh80+Kg9oSIaHuaKVmG2b4bM/nLEqQpqjXwVT78mymwE2A89Otir0ZFCoN63L9UkoV4Xl5XfxCxlbG3dJHSO9HlyoJlwn7lKDPsvBuEvRHbouP4AvZpvoUckLaowHHEsCUY/Pje9S44mO5VHWERUwLMe+SnvvEZ1lb2UfatIduTnbmp/W8iW/JLWfhLzlNbhwkU+JJirqet3CQ5NaAdDXZRdJ06zikq6tPK6h0IdK/jXC1Tz0VMr1vgQ1nXI7On5atEHKc6jcp8zszV/O8qkKVmrGS956u8t28XJD3nq76PaRBdZP5v3x37YrfzpOlYP9T7x/eyk77/qk3LKXVVBXvkF6lnb5JWRRvyY6u8C3ZuRzl33kPeKCoFfvvvOmsOuhTv8t9Zc8EnjvcAEJXZRzcSH16pSa8qlVRuhIaCa/oqUBd0W0dIeuFIZda6J7Z0BJey4SqzZfQE16H+5ZoEQyEzLcTnehDT2Ai9C8+MtUyEJgIRfvCI6hyd9uGUMQX7dyY887MhMLH5tfWIKWvZkUoBPHxVHcKAY0HETJd4GPXX0jbYYQX6d0sYGn0QELiqbML3ZheRLMkFF8OaqBQtALe9IATit5FLYwPwNtWNoRcBfg5tIFMoghCEbqoR4TQLXAI2hOKiLnwCE6v0PcVEISiTcyW4ZDJ1aYRCpE0HKBa2VgoilB0G90ytsBzKJ5QiHVjS+MK+MwblZCadobVBrCTYCJMPZwGDqdeoV4MC6HwpzWb6hL41CIbYWqqpGxUSw308TQ3hOmsWtdwfAmsZ1AeQiFGtTgAb1Y+DC9h6sc5D+K8AV/JdEUoROfJoT8+oNgnF6EQ/ZkjT24Vkvl4CNN5dc1cfTHV5sHWA5WLhzBVd8ZaV30ZAiuKGMVGmCp6ZrLWcQvhf6rESZgqeiPnbn4GjHiCnTB150YB/rhq8RgS14aq2Al3ilpL6yVk8T3FudYGuSHMNFw/fQInn9tta8Led7ncEWaKe9HH891SmSS3WN2/JUMnXXeUW8KD/HZ7NAmnQdA6KAimSdRrtxkWdKP+A+/RoeAbGo8mAAAAAElFTkSuQmCC"
                                    alt="">
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped></style>