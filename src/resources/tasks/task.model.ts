import { Board } from 'src/resources/boards/board.model';
import { User } from 'src/resources/users/user.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  userId: string | null;

  @ManyToOne(() => Board, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  boardId: any | string | null;

  @Column({ nullable: true })
  columnId: string;

  static toResponse(task: Task) {
    const { id, title, order, description, userId, columnId } = task;
    const board = <Board>task.boardId;
    const boardId = !board ? null : board.id;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
