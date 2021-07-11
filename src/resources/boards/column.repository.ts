import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnCreate } from 'src/resources/boards/column.create';
import { ColumnUpdate } from 'src/resources/boards/column.update';
import { BoardColumn } from 'src/resources/boards/column.model';

@Injectable()
export class ColumnsRepository {
  constructor(
    @InjectRepository(BoardColumn)
    private columnsRepository: Repository<BoardColumn>,
  ) {}

  async saveColumns(columnCreate: ColumnCreate[]): Promise<BoardColumn[]> {
    return await Promise.all(
      columnCreate.map((column) => this.columnsRepository.save(column)),
    );
  }

  async updateColumns(columnUpdate: ColumnUpdate[]) {
    return await this.columnsRepository.save(columnUpdate);
  }
}
