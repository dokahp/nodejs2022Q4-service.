import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
// import { User } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  // @Get(':id')
  // async getSingleUserById(
  //   @Param('id', IdValidationPipe) id: string,
  // ): Promise<Omit<User, 'password'>> {
  //   const user = await this.userService.getSingleUserById(id);
  //   if (!user) {
  //     throw new HttpException('error: no such user', HttpStatus.NOT_FOUND);
  //   }
  //   return user;
  // }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  // @Put(':id')
  // async updateUserPassword(
  //   @Param('id', IdValidationPipe) id: string,
  //   @Body() dto: UpdatePasswordDto,
  // ) {
  //   const user = await this.userService.getSingleUserById(id);
  //   if (!user) {
  //     throw new HttpException('error: no such user', HttpStatus.NOT_FOUND);
  //   }
  //   return this.userService.updateUserPassword(id, dto);
  // }

  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Delete(':id')
  // async deleteUser(@Param('id', IdValidationPipe) id: string): Promise<void> {
  //   const user = await this.userService.getSingleUserById(id);
  //   if (!user) {
  //     throw new HttpException('error: no such user', HttpStatus.NOT_FOUND);
  //   }
  //   this.userService.deleteUser(id);
  // }
}
