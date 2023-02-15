import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getSingleUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        login: user.login,
        password: user.password,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const userWithTimeAsNumber: Omit<User, 'password'> = {
      ...newUser,
      createdAt: Date.parse(newUser.createdAt.toISOString()),
      updatedAt: Date.parse(newUser.updatedAt.toISOString()),
    };
    return userWithTimeAsNumber;
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const newUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        id: id,
        password: dto.newPassword,
        version: { increment: 1 },
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const userWithTimeAsNumber: Omit<User, 'password'> = {
      ...newUser,
      createdAt: Date.parse(newUser.createdAt.toISOString()),
      updatedAt: Date.parse(newUser.updatedAt.toISOString()),
    };
    return userWithTimeAsNumber;
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
