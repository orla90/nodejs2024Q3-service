import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  create(createUser: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: uuidv4(),
      ...createUser,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.dbService.users.push(newUser);
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  findAll(): User[] {
    console.log('users', this.dbService.users);
    return this.dbService.users;
  }

  findOne(id: string): Omit<User, 'password'> {
    const user = this.dbService.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    const user = this.dbService.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    // if (!isUUID(id)) throw new BadRequestException('User id is invalid');

    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  delete(id: string): boolean {
    const index = this.dbService.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.dbService.users.splice(index, 1);
    return true;
  }
}
