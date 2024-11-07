import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(createUser: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      ...createUser,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers(): User[] {
    console.log('users', this.users);
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
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

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
