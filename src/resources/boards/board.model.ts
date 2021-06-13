import { v4 as uuidv4 } from 'uuid';
import { IBoardUpdatedBody } from './board.types';
import { IColumn } from './column.types';

class Board {

  id: string;

  title: string;

  columns: Array<IColumn>;

  constructor({
    title = 'DEFAULT BOARD TITLE',
    columns = [],
  }: IBoardUpdatedBody) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}

export { Board };
