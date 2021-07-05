import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, TasksRepository]
})
export class TaskModule {}
