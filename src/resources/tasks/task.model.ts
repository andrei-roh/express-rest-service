import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from "../users/user.model";
import { Board } from "../boards/board.model";
import { BoardColumn } from "../boards/column.model";
import { ITask } from '../types';

@Entity()
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('integer')
  order: number;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: Board;

  @Column()
  boardId: string;

  @ManyToOne(() => BoardColumn, { onDelete: 'SET NULL' })
  column!: BoardColumn;

  @Column({ nullable: true })
  columnId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User | undefined;

  @Column({ nullable: true })
  userId: string | null;

  constructor(
    boardId: string,
    {
      id = uuid(),
      title = '',
      order = 0,
      description = '',
      columnId = null,
      userId = null,
    }: Partial<ITask> = {}
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }
}

export { Task };
