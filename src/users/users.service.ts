import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'INTERN' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'ADMIN' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'INTERN' },
    { id: 4, name: 'Diana', email: 'diana@example.com', role: 'USER' },
    { id: 5, name: 'Evan', email: 'evan@example.com', role: 'INTERN' },
  ];

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      ...createUserDto,
      id: usersByHighestId[0].id + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(role?: 'INTERN' | 'USER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray) throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  remove(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
