import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { validate as isUuidValid } from 'uuid';
import { User, CreateUserDto, UpdatePasswordDto } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User {
    if (!isUuidValid(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto): User {
    if (!isUuidValid(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = this.userService.updatePassword(id, updatePasswordDto);
    if (!updatedUser) {
      throw new HttpException('User not found or old password is incorrect', HttpStatus.FORBIDDEN);
    }
    return updatedUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    if (!isUuidValid(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
    const success = this.userService.deleteUser(id);
    if (!success) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
