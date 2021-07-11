import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TaskCreate } from './task.create';
import { TaskUpdate } from './task.update';
import { Task } from './task.model';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async get(id: string): Promise<Task | undefined> {
    return await this.tasksRepository.findOne(id);
  }

  async save(taskCreate: TaskCreate): Promise<Task> {
    return await this.tasksRepository.save(taskCreate);
  }

  async update(taskUpdate: TaskUpdate): Promise<Task> {
    return await this.tasksRepository.save(taskUpdate);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.tasksRepository.delete(id);
  }
}
