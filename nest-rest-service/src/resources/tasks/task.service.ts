import { Injectable } from '@nestjs/common';
import { getUpdateTask } from './task.utils';
import { DeleteResult } from 'typeorm';
import { TaskCreate } from './task.create';
import { TaskUpdate } from './task.update';
import { Task } from './task.model';
import { TasksRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TasksRepository) {}

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.getAll();
  }

  async getTask(id: string): Promise<Task | undefined> {
    return await this.taskRepository.get(id);
  }

  async create(TaskCreate: TaskCreate): Promise<Task> {
    return await this.taskRepository.save(TaskCreate);
  }

  async update(id: string, TaskUpdate: TaskUpdate): Promise<Task> {
    const updatedTask = getUpdateTask(id, TaskUpdate)
    return await this.taskRepository.update(updatedTask);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.taskRepository.deleteTask(id);
  }
}
