import { Task } from 'src/resources/tasks/task.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardColumn } from 'src/resources/boards/column.model';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    eager: true,
    cascade: true,
  })
  columns: BoardColumn[];

  @OneToMany(() => Task, (task) => task.boardId, {
    cascade: true,
  })
  tasks: Task[];
}
