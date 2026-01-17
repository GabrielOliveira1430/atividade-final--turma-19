/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Cadastro e gerenciamento do usuário
 */

import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Body,
  CurrentUser,
} from 'routing-controllers';

import { UserService } from '../services/userService';
import { EnsureAuth } from '../../../shared/decorators/EnsureAuth';

@JsonController('/users')
export class UserController {
  private userService = new UserService();

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Criação de usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [name, email, password]
   *             properties:
   *               name:
   *                 type: string
   *                 example: Arthur
   *               email:
   *                 type: string
   *                 example: user@email.com
   *               password:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Erro de validação
   */
  @Post()
  async create(@Body() body: any) {
    return this.userService.createUser(body);
  }

  /**
   * @swagger
   * /users/me:
   *   get:
   *     summary: Retorna os dados do usuário autenticado
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Dados do usuário
   *       401:
   *         description: Não autorizado
   */
  @Get('/me')
  @EnsureAuth()
  async profile(@CurrentUser() user: any) {
    return {
      userId: user.id,
      email: user.email,
      name: user.name,
    };
  }

  /**
   * @swagger
   * /users/me:
   *   put:
   *     summary: Atualiza os dados do usuário autenticado
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *       400:
   *         description: Erro de validação
   *       401:
   *         description: Não autorizado
   */
  @Put('/me')
  @EnsureAuth()
  async update(
    @CurrentUser() user: any,
    @Body()
    body: {
      name?: string;
      email?: string;
      password?: string;
    }
  ) {
    return this.userService.updateUser(user.id, body);
  }

  /**
   * @swagger
   * /users/me:
   *   delete:
   *     summary: Remove a conta do usuário autenticado
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Usuário removido com sucesso
   *       401:
   *         description: Não autorizado
   */
  @Delete('/me')
  @EnsureAuth()
  async delete(@CurrentUser() user: any) {
    await this.userService.deleteUser(user.id);
    return { message: 'User deleted successfully' };
  }
}
