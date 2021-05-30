import { v4 as uuidv4 } from 'uuid';
import { IBoardUpdatedBody } from './board.types';
import { IColumn } from './column.types';

/**
* Create board's class.
* @param { Object } board - Board's information
* @param { String } board.id - Board's id. Create with uuid version 4
* @param { String } board.title - Board's title
* @param { Array<Column> } board.columns - Board's columns
*/
class Board {

  id: string;

  title: string;

  columns: Array<IColumn>;

  constructor({
    title = 'DEFAULT BOARD TITLE',
    columns = [
      {
        id: uuidv4(),
        title: 'DEFAULT COLUMN TITLE',
        order: 0
      }
    ],
  }: IBoardUpdatedBody) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}

export { Board };
