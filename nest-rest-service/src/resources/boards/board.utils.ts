import { BoardCreate } from './board.create';
import { BoardUpdate } from './board.update';
import { ColumnCreate } from './column.create';
import { BoardColumn } from './column.model';

const getBoard = (title: string, columns: BoardColumn[]): BoardCreate => Object({ title, columns });

const getCreateBoard = (BoardCreate: BoardCreate): string => BoardCreate.title;

const getUpdateBoard = (id: string, title: string) => Object({ id, title });

const getCreateColumn = (BoardCreate: BoardCreate): ColumnCreate[] => BoardCreate.columns;

const getUpdateColumn = (BoardUpdate: BoardUpdate) => BoardUpdate.columns;

export { getBoard, getCreateBoard, getUpdateBoard, getCreateColumn, getUpdateColumn };
