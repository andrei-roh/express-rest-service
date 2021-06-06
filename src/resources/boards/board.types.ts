import { IColumn } from './column.types';

interface IBoardUpdatedBody {
  title: string;
  columns: Array<IColumn>;
}
interface IBoard extends IBoardUpdatedBody {
  id: string;
}

export { IBoard, IBoardUpdatedBody };
