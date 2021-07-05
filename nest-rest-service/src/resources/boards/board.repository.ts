import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { BoardCreate } from './board.create';
import { BoardUpdate } from './board.update';
import { Board } from './board.model';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) { }

  async getAll(): Promise<Board[]> {
    return await this.boardsRepository.find();
  }

  async get(id: string): Promise<Board | undefined> {
    return await this.boardsRepository.findOne(id);
  }

  async save(boardCreate: BoardCreate): Promise<Board> {
    return await this.boardsRepository.save(boardCreate);
  }

  async update(boardUpdate: BoardUpdate): Promise<Board> {
    return await this.boardsRepository.save(boardUpdate);
  }

  async deleteBoard(id: string): Promise<DeleteResult> {
    return await this.boardsRepository.delete(id);
  }
}
