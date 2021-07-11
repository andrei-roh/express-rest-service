import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  getBoard,
  getCreateBoard,
  getUpdateBoard,
  getCreateColumn,
  getUpdateColumn
} from './board.utils';
import { DeleteResult } from 'typeorm';
import { BoardsRepository } from './board.repository';
import { ColumnRepository } from './column.repository';
import { BoardCreate } from './board.create';
import { BoardUpdate } from './board.update';
import { Board } from './board.model';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardsRepository,
    private readonly columnRepository: ColumnRepository,
  ) {}

  async getAll(): Promise<Board[]> {
    return await this.boardRepository.getAll();
  }

  async getBoard(id: string): Promise<Board> {
    return await this.boardRepository.get(id);
  }

  async create(BoardCreate: BoardCreate): Promise<Board> {
    const columnsCreate = getCreateColumn(BoardCreate);
    const columnsCreated = await this.columnRepository.saveColumn(columnsCreate);
    const title = getCreateBoard(BoardCreate);
    const board = getBoard(title, columnsCreated);
    return await this.boardRepository.save(board);
  }

  async update(id: string, BoardUpdate: BoardUpdate): Promise<Board> {
    const columns = getUpdateColumn(BoardUpdate);
    await this.columnRepository.updateColumns(columns);
    const board = getUpdateBoard(id, BoardUpdate.title);
    return await this.boardRepository.update(board);
  }

  async deleteBoard(id: string): Promise<DeleteResult> {
    return await this.boardRepository.deleteBoard(id);
  }
}
