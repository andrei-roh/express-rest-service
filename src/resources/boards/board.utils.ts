import { BoardCreate } from 'src/resources/boards/board.create';
import { BoardUpdate } from 'src/resources/boards/board.update';
import { ColumnCreate } from 'src/resources/boards/column.create';
import { BoardColumn } from 'src/resources/boards/column.model';

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
