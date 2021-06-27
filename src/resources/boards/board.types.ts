import { IColumn } from './column.types';

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export { IBoard };
