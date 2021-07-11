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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { TaskCreate } from './task.create';
import { TaskUpdate } from './task.update';
import { Task } from './task.model';
import { Filter } from '../../middlewares/filter';
import { LoginGuard } from '../login/login.guard';

@Controller('boards/:boardId/tasks')
@UseFilters(Filter)
@UseGuards(LoginGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll() {
    const tasks = await this.tasksService.getAll();
    return tasks.map((task) => Task.toResponse(task));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const task = await this.isTask(id);
    return Task.toResponse(task);
  }

  @Post()
  async create(@Param('id') id: string, @Body() taskCreate: TaskCreate) {
    taskCreate.boardId = id;
    return await this.tasksService.create(taskCreate);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() taskUpdate: TaskUpdate,
  ) {
    await this.isTask(id);
    const task = await this.tasksService.update(id, taskUpdate);
    return Task.toResponse(task);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.isTask(id);
    return await this.tasksService.deleteTask(id);
  }

  async isTask(id: string) {
    const task = await this.tasksService.getTask(id);
    if (!task) throw new NotFoundException();
    return task;
  }
}
