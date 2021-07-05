import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConnectionToDatabase } from './common/database.module';
import { UserModule } from './resources/users/user.module';
import { BoardModule } from './resources/boards/board.module';
import { TaskModule } from './resources/tasks/task.module';

@Module({
  imports: [getConnectionToDatabase, UserModule, BoardModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
