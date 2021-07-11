import { BoardCreate } from './board.create';
import { BoardUpdate } from './board.update';
import { ColumnCreate } from './column.create';
import { BoardColumn } from './column.model';

const getBoard = (title: string, columns: BoardColumn[]): BoardCreate =>
  Object({ title, columns });

const getCreateBoard = (boardCreate: BoardCreate): string => boardCreate.title;

const getUpdateBoard = (id: string, title: string) => Object({ id, title });

const getCreateColumn = (boardCreate: BoardCreate): ColumnCreate[] =>
  boardCreate.columns;

const getUpdateColumn = (boardUpdate: BoardUpdate) => boardUpdate.columns;

export {
  getBoard,
  getCreateBoard,
  getUpdateBoard,
  getCreateColumn,
  getUpdateColumn,
};
