import { Injectable } from '@nestjs/common';
import {
  getBoard,
  getCreateBoard,
  getUpdateBoard,
  getCreateColumn,
  getUpdateColumn,
} from './board.utils';
import { DeleteResult } from 'typeorm';
import { BoardsRepository } from 'src/resources/boards/board.repository';
import { ColumnsRepository } from 'src/resources/boards/column.repository';
import { BoardCreate } from 'src/resources/boards/board.create';
import { BoardUpdate } from 'src/resources/boards/board.update';
import { Board } from 'src/resources/boards/board.model';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private readonly columnsRepository: ColumnsRepository,
  ) {}

  async getAll(): Promise<Board[]> {
    return await this.boardsRepository.getAll();
  }

  async getBoard(id: string): Promise<Board> {
    return await this.boardsRepository.get(id);
  }

  async create(boardCreate: BoardCreate): Promise<Board> {
    const columnsCreate = getCreateColumn(boardCreate);
    const columnsCreated = await this.columnsRepository.saveColumns(
      columnsCreate,
    );
    const title = getCreateBoard(boardCreate);
    const board = getBoard(title, columnsCreated);
    return await this.boardsRepository.save(board);
  }

  async update(id: string, boardUpdate: BoardUpdate): Promise<Board> {
    const columns = getUpdateColumn(boardUpdate);
    await this.columnsRepository.updateColumns(columns);
    const board = getUpdateBoard(id, boardUpdate.title);
    return await this.boardsRepository.update(board);
  }

  async deleteBoard(id: string): Promise<DeleteResult> {
    return await this.boardsRepository.deleteBoard(id);
  }
}
