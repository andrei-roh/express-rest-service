import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConnectionToDatabase } from './common/database.module';
import { UsersModule } from './resources/users/user.module';
import { BoardsModule } from './resources/boards/board.module';
import { TasksModule } from './resources/tasks/task.module';
import { LoginModule } from './resources/login/login.module';
import { ConfigModule } from '@nestjs/config';
import { Logging } from './middlewares/logging';
import { LoginController } from './resources/login/login.controller';
import { UsersController } from './resources/users/user.controller';
import { BoardsController } from './resources/boards/board.controller';
import { TasksController } from './resources/tasks/task.controller';

@Module({
  imports: [
    getConnectionToDatabase,
    LoginModule,
    UsersModule,
    BoardsModule,
    TasksModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Logging)
      .forRoutes(
        AppController,
        LoginController,
        UsersController,
        BoardsController,
        TasksController,
      );
  }
}
