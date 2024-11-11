import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { validate as isUuidValid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Omit<User, 'password'> {
    if (!isUuidValid(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
    const user = this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Omit<User, 'password'> {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string): void {
    const success = this.userService.delete(id);
    if (!success) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
