import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InitMigration } from 'src/migrations/init';
import { User } from 'src/resources/users/user.model';
import { Board } from 'src/resources/boards/board.model';
import { BoardColumn as Column } from 'src/resources/boards/column.model';
import { Task } from 'src/resources/tasks/task.model';
import * as dotenv from 'dotenv';

dotenv.config();

export const setConnectionToDatabase: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_DBHOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [User, Board, Column, Task],
  migrations: [InitMigration],
  migrationsRun: true,
  cli: { migrationsDir: 'migration' },
};
