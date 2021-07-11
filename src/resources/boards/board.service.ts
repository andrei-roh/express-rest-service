import { Injectable } from '@nestjs/common';
import {
  getBoard,
  getCreateBoard,
  getUpdateBoard,
  getCreateColumn,
  getUpdateColumn,
} from './board.utils';
import { DeleteResult } from 'typeorm';
import { BoardsRepository } from './board.repository';
import { ColumnsRepository } from './column.repository';
import { BoardCreate } from './board.create';
import { BoardUpdate } from './board.update';
import { Board } from './board.model';

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
