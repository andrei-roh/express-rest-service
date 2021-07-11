import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserCreate } from './user.create';
import { UserUpdate } from './user.update';
import { User } from './user.model';
import { UsersRepository } from './user.repository';
import { getCreateUser, getUpdateUser } from './user.utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) { }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.get(id);
  }

  async getUserByLogin(login: string): Promise<User> {
    return await this.userRepository.getUserByLogin(login);
  }

  async create(userCreate: UserCreate): Promise<User> {
    const readyToCreateUser = await getCreateUser(userCreate);
    return await this.userRepository.save(readyToCreateUser);
  }

  async update(id: string, userUpdate: UserUpdate): Promise<User> {
    const updatedUser = await getUpdateUser(id, userUpdate);
    return await this.userRepository.update(updatedUser);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.deleteUser(id);
  }
}
