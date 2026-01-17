import { AlunoRepository } from '../repositories/alunoRepository';

export class AlunoService {
  private alunoRepository = new AlunoRepository();

  async listAlunos() {
    return this.alunoRepository.findAll();
  }

  async createAluno(data: { nome: string; email: string }) {
    return this.alunoRepository.create(data);
  }
}
