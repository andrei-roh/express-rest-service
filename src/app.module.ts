import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { getConnectionToDatabase } from 'src/common/database.module';
import { UsersModule } from 'src/resources/users/user.module';
import { BoardsModule } from 'src/resources/boards/board.module';
import { TasksModule } from 'src/resources/tasks/task.module';
import { LoginModule } from 'src/resources/login/login.module';
import { ConfigModule } from '@nestjs/config';
import { Logging } from 'src/middlewares/logging';
import { LoginController } from 'src/resources/login/login.controller';
import { UsersController } from 'src/resources/users/user.controller';
import { BoardsController } from 'src/resources/boards/board.controller';
import { TasksController } from 'src/resources/tasks/task.controller';

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
