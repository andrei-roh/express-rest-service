import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnCreate } from './column.create';
import { ColumnUpdate } from './column.update';
import { BoardColumn } from './column.model';

@Injectable()
export class ColumnRepository {
  constructor(
    @InjectRepository(BoardColumn)
    private columnRepository: Repository<BoardColumn>,
  ) { }

  async saveColumn(ColumnCreate: ColumnCreate[]): Promise<BoardColumn[]> {
    return await Promise.all(ColumnCreate.map((column) => this.columnRepository.save(column)));
  }

  async updateColumns(ColumnUpdate: ColumnUpdate[]) {
    return await this.columnRepository.save(ColumnUpdate);
  }
}
