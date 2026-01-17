/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Endpoints de alunos
 */

import {
  JsonController,
  Get,
  Post,
  Body,
  UseBefore,
} from 'routing-controllers';

import { AlunoService } from '../services/alunoService';
import { EnsureAuthMiddleware } from '../../../shared/middleware/EnsureAuthMiddleware';
import { CreateAlunoDTO } from '../dtos/createAlunoDTO';

@JsonController('/alunos')
export class AlunoController {
  private alunoService = new AlunoService();

  /**
   * @swagger
   * /alunos:
   *   get:
   *     summary: Lista alunos (rota protegida)
   *     tags: [Alunos]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de alunos
   *       401:
   *         description: Não autorizado
   */
  @Get()
  @UseBefore(EnsureAuthMiddleware)
  async list() {
    return this.alunoService.listAlunos();
  }

  /**
   * @swagger
   * /alunos:
   *   post:
   *     summary: Cria um aluno (rota protegida)
   *     tags: [Alunos]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: João Silva
   *               email:
   *                 type: string
   *                 example: joao@email.com
   *     responses:
   *       201:
   *         description: Aluno criado
   *       401:
   *         description: Não autorizado
   */
  @Post()
  @UseBefore(EnsureAuthMiddleware)
  async create(@Body() body: CreateAlunoDTO) {
    return this.alunoService.createAluno(body);
  }
}
