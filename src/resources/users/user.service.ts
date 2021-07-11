import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserCreate } from 'src/resources/users/user.create';
import { UserUpdate } from 'src/resources/users/user.update';
import { User } from 'src/resources/users/user.model';
import { UsersRepository } from 'src/resources/users/user.repository';
import { getCreateUser, getUpdateUser } from 'src/resources/users/user.utils';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.getAll();
  }

  async getUser(id: string): Promise<User> {
    return await this.usersRepository.get(id);
  }

  async getUserByLogin(login: string): Promise<User> {
    return await this.usersRepository.getUserByLogin(login);
  }

  async create(userCreate: UserCreate): Promise<User> {
    const readyToCreateUser = await getCreateUser(userCreate);
    return await this.usersRepository.save(readyToCreateUser);
  }

  async update(id: string, userUpdate: UserUpdate): Promise<User> {
    const updatedUser = await getUpdateUser(id, userUpdate);
    return await this.usersRepository.update(updatedUser);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.usersRepository.deleteUser(id);
  }
}
