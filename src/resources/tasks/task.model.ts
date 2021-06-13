import { v4 as uuidv4 } from 'uuid';
import { ITaskDataFromRequest } from './task.types';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    title = 'DEFAULT TASK TITLE',
    order = 0,
    description = 'DEFAULT TASK DESCRIPTION',
    userId = null,
    boardId = null,
    columnId = null
  }: ITaskDataFromRequest) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export { Task };
