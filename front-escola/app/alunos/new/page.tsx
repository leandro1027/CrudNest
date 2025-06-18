'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAluno,} from "@/lib/alunosAPI";
import { Aluno } from "@/types/Aluno";

export default function NovoAluno(){
    const [form, setForm]= useState<Aluno>({nome: '', idade: 0, curso: ''});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const HandleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        await createAluno(form);
        router.push('/alunos');
    };

return (
    <div>
        <h1>Novo Aluno</h1>
        <form onSubmit={HandleSubmit}>
            <input name="nome" placeholder="Nome" onChange={handleChange} required/>
            <input name="idade" type="number"placeholder="Idade" onChange={handleChange} required/>
            <input name="curso" placeholder="Curso" onChange={handleChange} required/>
            <button type="submit">Salvar</button>
        </form>
    </div>
)


}