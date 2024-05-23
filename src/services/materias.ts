import { CreateMateria, Materia } from "../interfaces/Materias";
import { httpClient } from "./api";
import { BaseService, Error } from "../interfaces/BaseService";

export const createMateriaService = async (data: CreateMateria): Promise<BaseService<Materia>> => {
    const response = await httpClient.post("/disciplina", data);
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

export const getMateriasService = async (): Promise<BaseService<Materia[]>> => {
    const response = await httpClient.get("/disciplina");
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

export const updateMateriaService = async (data: Materia): Promise<BaseService<Materia>> => {
    const response = await httpClient.put(`/disciplina/${data.id}`, data);
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

export const deleteMateriaService = async (id: number) => {
    const response = await httpClient.delete(`/disciplina/${id}`);
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