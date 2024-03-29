import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async getAllUsers() {
    return this.usersRepo.findMany({
      orderBy: {
        points: 'desc',
      },
    });
  }

  async updateUser(userId: string, updateUser: Prisma.UserUpdateArgs) {
    const { name, email, image } = updateUser.data;

    return this.usersRepo.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        image,
      },
    });
  }
}
