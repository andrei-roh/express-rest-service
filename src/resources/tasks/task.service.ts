import { Injectable } from '@nestjs/common';
import { getUpdateTask } from './task.utils';
import { DeleteResult } from 'typeorm';
import { TaskCreate } from './task.create';
import { TaskUpdate } from './task.update';
import { Task } from './task.model';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getAll(): Promise<Task[]> {
    return await this.tasksRepository.getAll();
  }

  async getTask(id: string): Promise<Task | undefined> {
    return await this.tasksRepository.get(id);
  }

  async create(taskCreate: TaskCreate): Promise<Task> {
    return await this.tasksRepository.save(taskCreate);
  }

  async update(id: string, taskUpdate: TaskUpdate): Promise<Task> {
    const updatedTask = getUpdateTask(id, taskUpdate);
    return await this.tasksRepository.update(updatedTask);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.tasksRepository.deleteTask(id);
  }
}
