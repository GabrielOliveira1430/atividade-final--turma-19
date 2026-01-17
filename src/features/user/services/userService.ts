import bcrypt from 'bcrypt';
import { BadRequestError } from 'routing-controllers';
import { UserRepository } from '../repositories/userRepository';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: CreateUserInput) {
    const email = data.email.trim().toLowerCase();

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new BadRequestError('User already exists');
    }

    // 🔐 hash obrigatório da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      name: data.name.trim(),
      email,
      password: hashedPassword,
    });

    // nunca retornar senha
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 🔄 ATUALIZAR USUÁRIO
  async updateUser(userId: string, data: UpdateUserInput) {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError('No data provided for update');
    }

    if (data.email) {
      data.email = data.email.trim().toLowerCase();

      const emailAlreadyInUse = await this.userRepository.findByEmail(
        data.email
      );

      if (emailAlreadyInUse && emailAlreadyInUse.id !== userId) {
        throw new BadRequestError('Email already in use');
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.userRepository.update(userId, data);

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  // 🗑️ DELETAR USUÁRIO
  async deleteUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    await this.userRepository.delete(userId);
  }
}
