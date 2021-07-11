import { Module, Logger } from '@nestjs/common';
import { BoardsService } from 'src/resources/boards/board.service';
import { BoardsController } from 'src/resources/boards/board.controller';
import { Board } from 'src/resources/boards/board.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from 'src/resources/boards/board.repository';
import { ColumnsRepository } from 'src/resources/boards/column.repository';
import { BoardColumn } from 'src/resources/boards/column.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([BoardColumn]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository, ColumnsRepository, Logger],
})
export class BoardsModule {}
