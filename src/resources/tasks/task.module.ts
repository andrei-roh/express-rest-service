import { Module, Logger } from '@nestjs/common';
import { TasksService } from 'src/resources/tasks/task.service';
import { TasksController } from 'src/resources/tasks/task.controller';
import { Task } from 'src/resources/tasks/task.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from 'src/resources/tasks/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, Logger],
})
export class TasksModule {}
