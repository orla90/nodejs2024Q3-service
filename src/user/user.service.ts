import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  create(createUser: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      ...createUser,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.dbService.users.push(newUser);
    return newUser;
  }

  getAllUsers(): User[] {
    console.log('users', this.dbService.users);
    return this.dbService.users;
  }

  getUserById(id: string): User | undefined {
    return this.dbService.users.find((user) => user.id === id);
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): User | null {
    const user = this.getUserById(id);
    if (!user) return null;
    if (user.password !== updatePasswordDto.oldPassword) return null;

    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  delete(id: string): boolean {
    const index = this.dbService.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.dbService.users.splice(index, 1);
    return true;
  }
}
