import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setConnectionToDatabase } from './database';

@Module({
  imports: [TypeOrmModule.forRoot(setConnectionToDatabase)],
})
export class getConnectionToDatabase {}
