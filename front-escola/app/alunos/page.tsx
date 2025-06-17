'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAlunos, deleteAluno } from "@/lib/alunosAPI";
import { Aluno } from "@/types/Aluno";

export default function listaAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const carregar = async () => {
    const res  = await getAlunos();
    setAlunos(res.data);
  };

  useEffect(() => {
    carregar();
  },[]);

  const handleDelete = async (id: number) => {
    if(confirm("Deseja remover?")){
        await deleteAluno(id);
        carregar();
    
    }
};

return (
    <div>
        <h1>Lista de alunos</h1>
        <link href="/alunos/new">+  Novo Aluno</link>
        <ul>
            {alunos.map((a) => (
                <li key={a.id}>
                    {a.nome} ({a.idade} anos) - {a.curso}
                    <Link href={`/alunos/${a.id}`} style={{marginLeft: 10}}>Editar</Link>
                    <button onClick={() => handleDelete(a.id!)} style={{marginLeft: 10}}>Excluir</button>
                </li>
            ))}
            </ul>
        </div>
    );
}

  