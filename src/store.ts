import { ref } from "vue";
import { Aluno } from "./interfaces/Aluno";
import { Materia } from "./interfaces/Materias";

export const alunos = ref<Array<Aluno>>([]);
export const alunosCounter = ref<number>(0);

export const materias = ref<Array<Materia>>([]);
export const materiasCounter = ref<number>(0);