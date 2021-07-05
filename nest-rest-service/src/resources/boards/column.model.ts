import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from './board.model';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board: Board;
}
