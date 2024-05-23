export interface Error {
    status: number;
    message: string;
    detail: string;
}


export interface BaseService<T> {
    data: T | null;
    errors: Error | null;
}