import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserCreate } from './user.create';
import { UserUpdate } from './user.update';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async get(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async getUserByLogin(login: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { login: login } });
  }

  async save(UserCreate: UserCreate): Promise<User> {
    return await this.userRepository.save(UserCreate);
  }

  async update(UserCreate: UserUpdate): Promise<User> {
    return await this.userRepository.save(UserCreate);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
