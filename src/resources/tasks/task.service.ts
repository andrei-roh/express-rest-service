import { Injectable } from '@nestjs/common';
import { getUpdateTask } from 'src/resources/tasks/task.utils';
import { DeleteResult } from 'typeorm';
import { TaskCreate } from 'src/resources/tasks/task.create';
import { TaskUpdate } from 'src/resources/tasks/task.update';
import { Task } from 'src/resources/tasks/task.model';
import { TasksRepository } from 'src/resources/tasks/task.repository';

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
