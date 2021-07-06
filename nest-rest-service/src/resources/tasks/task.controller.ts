import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  ParseUUIDPipe,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreate } from './task.create';
import { TaskUpdate } from './task.update';
import { Task } from './task.model';
import { Filter } from '../../middlewares/filter';
import { LoginGuard } from '../login/login.guard';

@Controller('boards/:id/tasks')
@UseFilters(Filter)
@UseGuards(LoginGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async getAll() {
    const tasks = await this.taskService.getAll();
    return tasks.map((task) => Task.toResponse(task));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const task = await this.isTask(id);
    return Task.toResponse(task);
  }

  @Post()
  async create(@Param('id') id: string, @Body() TaskCreate: TaskCreate) {
    TaskCreate.boardId = id;
    return await this.taskService.create(TaskCreate);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() TaskUpdate: TaskUpdate) {
    await this.isTask(id);
    const task = await this.taskService.update(id, TaskUpdate);
    return Task.toResponse(task);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.isTask(id);
    return await this.taskService.deleteTask(id);
  }

  async isTask(id: string) {
    const task = await this.taskService.getTask(id);
    if (!task) throw new NotFoundException();
    return task;
  }
}
