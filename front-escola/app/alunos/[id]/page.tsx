'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAluno, updateAluno } from "@/lib/alunosAPI";
import { Aluno } from "@/types/Aluno";

export default function EditarAluno() { 
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);

    const [form, setForm] = useState<Aluno>({nome: '', idade: 0, curso: ''});

    useEffect(() => {
        if(id){
            getAluno(id).then((res) => setForm(res.data));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateAluno(id, form);
        router.push('/alunos');
    };

    return (
        <div>
            <h1>Editar Alunp</h1>
            <form onSubmit={HandleSubmit}>
                <input name="nome" value={form.nome} onChange={handleChange} required/>
                <input name="idade" type="number" value={form.idade} onChange={handleChange} required/>
                <input name="curso" value={form.curso} onChange={handleChange} required/>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

        






   