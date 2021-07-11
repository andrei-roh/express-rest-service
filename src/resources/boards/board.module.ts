import { Module, Logger } from '@nestjs/common';
import { BoardsService } from './board.service';
import { BoardsController } from './board.controller';
import { Board } from './board.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './board.repository';
import { ColumnsRepository } from './column.repository';
import { BoardColumn } from './column.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([BoardColumn]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository, ColumnsRepository, Logger],
})
export class BoardsModule {}
