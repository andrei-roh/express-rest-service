import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IBoard, IColumn } from '../types';
import { BoardColumn } from './column.model';

@Entity()
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @OneToMany(
    () => BoardColumn,
    column => column.board,
    { onDelete: 'CASCADE', cascade: true, eager: true }
  )
  columns!: IColumn[];

  constructor({ id = uuidv4(), title = '', columns }: Partial<IBoard> = {}) {
    this.id = id;
    this.title = title;
    if (columns) {
      this.columns = columns;
    }
  }
}

export { Board };
