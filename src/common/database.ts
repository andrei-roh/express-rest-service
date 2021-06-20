import { Connection, createConnection } from 'typeorm';
import {
  POSTGRES_DBHOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
 } from './config';
import { User } from '../resources/users/user.model';
import { Board } from '../resources/boards/board.model';
import { BoardColumn } from '../resources/boards/column.model';
import { Task } from '../resources/tasks/task.model';
import { InitMigration } from '../migrations/init';


let connection: Connection | null = null;

export const setConnectionToDatabase = async () => {
  try {
    connection = await createConnection({
      type: 'postgres',
      host: POSTGRES_DBHOST,
      port: POSTGRES_PORT,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: [User, Board, BoardColumn, Task],
      migrations: [InitMigration],
      migrationsRun: true,
    });
    console.log(`Database connected`);
    return connection
  } catch (err) {
    console.log(`${err}`);
  }
  return connection
};

export const getConnectionToDatabase = () => connection;
