import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IColumn, IBoard } from '../types';
import { Board } from './board.model';

@Entity()
class BoardColumn implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('integer')
  order: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: IBoard;

  @Column()
  boardId: string = '';

  constructor({ id = uuidv4(), title = '', order = 0 }: Partial<IColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export { BoardColumn };
