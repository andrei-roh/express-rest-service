import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConnectionToDatabase } from './common/database.module';
import { UserModule } from './resources/users/user.module';
import { BoardModule } from './resources/boards/board.module';
import { TaskModule } from './resources/tasks/task.module';
import { LoginModule } from './resources/login/login.module';
import { ConfigModule } from '@nestjs/config';
import { Logging } from './middlewares/logging';
import { LoginController } from './resources/login/login.controller';
import { UserController } from './resources/users/user.controller';
import { BoardController } from './resources/boards/board.controller';
import { TaskController } from './resources/tasks/task.controller';

@Module({
  imports: [getConnectionToDatabase, LoginModule, UserModule, BoardModule, TaskModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, Logger],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Logging)
      .forRoutes(AppController, LoginController, UserController, BoardController, TaskController);
  }
}
