/* eslint-disable indent */
import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { type Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put('/me')
  updateUser(
    @ActiveUserId() userId: string,
    @Body() updateUser: Prisma.UserUpdateArgs,
  ) {
    return this.usersService.updateUser(userId, updateUser);
  }
}
