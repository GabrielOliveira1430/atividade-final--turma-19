import { prisma } from '../../../shared/prisma';

interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

export class UserRepository {
  async create(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email.trim().toLowerCase(),
        password: data.password,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async incrementLoginAttempts(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: { increment: 1 },
      },
    });
  }

  async lockUser(userId: string, minutes = 15) {
    const lockedUntil = new Date(Date.now() + minutes * 60 * 1000);

    return prisma.user.update({
      where: { id: userId },
      data: {
        lockedUntil,
      },
    });
  }

  async resetLoginAttempts(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  // 🔄 ATUALIZA USUÁRIO
  async update(id: string, data: UpdateUserDTO) {
    return prisma.user.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email.trim().toLowerCase() }),
        ...(data.password && { password: data.password }),
      },
    });
  }

  // 🗑️ REMOVE USUÁRIO
  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
