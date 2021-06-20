import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import type { IBoard } from './board.types';
import { Board } from './board.model';
import { IColumn } from './column.types';

@Entity()
class BoardColumn implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('integer')
  order: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board: IBoard | undefined;

  @Column()
  boardId = '';

  constructor({ id = uuid(), title = '', order = 0 }: Partial<IColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export { BoardColumn };
