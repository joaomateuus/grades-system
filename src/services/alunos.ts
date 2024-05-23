import { Aluno, CreateAluno } from "../interfaces/Aluno";
import { BaseService, Error } from "../interfaces/BaseService";
import { httpClient } from "./api";

export const createAlunoService = async (data: CreateAluno): Promise<BaseService<Aluno>> => {
    const response = await httpClient.post("/aluno", data);
    let errors: Error | null = null;

    if (!response.data) {
        errors = {
            status: response.request.status,
            message: response.request.statusText,
            detail: response.request.responseText
        }
    }

    return { data: response.data, errors }
}

export const getAlunosService = async (): Promise<BaseService<Aluno[]>> => {
    const response = await httpClient.get("/aluno");
    let errors: Error | null = null;

    if (!response.data) {
        errors = {
            status: response.request.status,
            message: response.request.statusText,
            detail: response.request.responseText
        }
    }

    return { data: response.data, errors }
}

export const updateAlunoService = async (data: Aluno): Promise<BaseService<Aluno>> => {
    const response = await httpClient.put(`/aluno/${data.id}`, data);
    let errors: Error | null = null;

    if (!response.data) {
        errors = {
            status: response.request.status,
            message: response.request.statusText,
            detail: response.request.responseText
        }
    }

    return { data: response.data, errors }
}

export const deleteAlunoService = async (id: number): Promise<BaseService<null>> => {
    const response = await httpClient.delete(`/aluno/${id}`);
    let errors: Error | null = null;

    if (!response.data) {
        errors = {
            status: response.request.status,
            message: response.request.statusText,
            detail: response.request.responseText
        }
    }

    return { data: response.data, errors }
}