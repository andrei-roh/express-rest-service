import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserCreate } from './user.create';
import { UserUpdate } from './user.update';
import { User } from './user.model';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async get(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne(id);
  }

  async getUserByLogin(login: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { login: login } });
  }

  async save(userCreate: UserCreate): Promise<User> {
    return await this.usersRepository.save(userCreate);
  }

  async update(userUpdate: UserUpdate): Promise<User> {
    return await this.usersRepository.save(userUpdate);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
