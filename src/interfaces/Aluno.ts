export interface CreateAluno {
    nome: string;
    email: string;
    data_nascimento: string;
}

export interface Aluno extends CreateAluno {
    id: number;
}