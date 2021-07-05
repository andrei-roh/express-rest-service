import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InitMigration } from '../migrations/init';
import { User } from '../resources/users/user.model';
import { Board } from '../resources/boards/board.model';
import { BoardColumn as Column } from '../resources/boards/column.model';
import { Task } from '../resources/tasks/task.model';
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
