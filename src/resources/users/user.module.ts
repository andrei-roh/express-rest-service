import { Module, Logger } from '@nestjs/common';
import { UsersService } from 'src/resources/users/user.service';
import { UsersController } from 'src/resources/users/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/resources/users/user.model';
import { UsersRepository } from 'src/resources/users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, Logger],
  exports: [UsersService],
})
export class UsersModule {}
