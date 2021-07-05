import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './board.repository';
import { ColumnRepository } from './column.repository';
import { BoardColumn } from './column.model';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TypeOrmModule.forFeature([BoardColumn])],
  controllers: [BoardController],
  providers: [BoardService, BoardsRepository, ColumnRepository]
})

export class BoardModule {}
