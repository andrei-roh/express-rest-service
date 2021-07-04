import { Module } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
import { InitMigration } from '../migrations/init';
import dotenv from 'dotenv';

dotenv.config();

export const setConnectionToDatabase: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_DBHOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  // entities: [User, Board, Column, Task],
  migrations: [InitMigration],
  migrationsRun: true,
  cli: { migrationsDir: 'migration' },
};

@Module({
  imports: [TypeOrmModule.forRoot(setConnectionToDatabase)],
})
export class getConnectionToDatabase { }
