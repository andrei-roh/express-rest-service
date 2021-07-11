import { Module, Logger } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { Task } from './task.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, Logger],
})
export class TasksModule {}
