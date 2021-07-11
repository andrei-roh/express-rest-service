import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setConnectionToDatabase } from 'src/common/database';

@Module({
  imports: [TypeOrmModule.forRoot(setConnectionToDatabase)],
})
export class getConnectionToDatabase {}
