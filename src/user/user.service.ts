import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  usersMock: User[] = [];

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
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        login: user.login,
        password: user.password,
      },
    });
    delete user.password;
    return newUser;
  }

  // async updateUserPassword(id: string, dto: UpdatePasswordDto): Promise<User> {
  //   const existedUser = await this.getSingleUserById(id);
  //   if (existedUser.password !== dto.oldPassword) {
  //     throw new HttpException('password is wrong', HttpStatus.FORBIDDEN);
  //   }

  //   const newUserPassword: User = {
  //     ...existedUser,
  //     password: dto.newPassword,
  //     version: ++existedUser.version,
  //     updatedAt: Date.now(),
  //   };
  //   this.usersMock = this.usersMock.map((user: User) =>
  //     user.id === id ? { ...newUserPassword } : user,
  //   );
  //   delete newUserPassword.password;
  //   return newUserPassword;
  // }

  // async deleteUser(id: string): Promise<void> {
  //   this.usersMock = this.usersMock.filter((user: User) => user.id !== id);
  // }
}
