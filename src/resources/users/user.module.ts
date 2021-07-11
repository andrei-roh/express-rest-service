import { Module, Logger } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UsersRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, Logger],
  exports: [UsersService],
})
export class UsersModule {}
