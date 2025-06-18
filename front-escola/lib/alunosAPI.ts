import axios from 'axios';
import { Aluno } from '../types/Aluno';

const api = axios.create({
    baseURL: 'http://localhost:3005/alunos'
});

export const getAlunos = () => api.get<Aluno[]>('/')
export const getAluno = (id: number) => api.get<Aluno>(`/${id}`);
export const createAluno = (data : Aluno) => api.post('/', data);
export const updateAluno = (id: number, data: Partial<Aluno>) => api.patch(`/${id}`, data);
export const deleteAluno = (id: number) => api.delete(`/${id}`);
