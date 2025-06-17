import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunosService {
  private alunos: Aluno[] = [];
  private nextId = 1;

  create(createAlunoDto: CreateAlunoDto): Aluno {
    const novoAluno: Aluno = {
      id: this.nextId++,
      ...createAlunoDto,
    };
    this.alunos.push(novoAluno);
    return novoAluno;
  }

  findAll(): Aluno[] {
    return this.alunos;
  }

  findOne(id: number): Aluno {
    const aluno = this.alunos.find((a) => a.id === id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
    }
    return aluno;
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto): Aluno {
    const alunoIndex = this.alunos.findIndex((a) => a.id === id);
    if (alunoIndex === -1) {
      throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
    }
    const alunoAtualizado = { ...this.alunos[alunoIndex], ...updateAlunoDto };
    this.alunos[alunoIndex] = alunoAtualizado;
    return alunoAtualizado;
  }

  remove(id: number): void {
    const index = this.alunos.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
    }
    this.alunos.splice(index, 1);
  }
}


