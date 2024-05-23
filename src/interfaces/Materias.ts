export interface CreateMateria {
    nome_disciplina: string;
    professor_responsavel: string;
}

export interface Materia extends CreateMateria {
    id: number;
}