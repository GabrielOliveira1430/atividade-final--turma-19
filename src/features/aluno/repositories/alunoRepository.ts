import { prisma } from '../../../shared/prisma';

export class AlunoRepository {
  async findAll() {
    return prisma.aluno.findMany();
  }

  async create(data: { nome: string; email: string }) {
    return prisma.aluno.create({ data });
  }
}
