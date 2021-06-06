import { v4 as uuidv4 } from 'uuid';
import { IColumnDataFromRequestBody } from './column.types';

class Column {
  id: string;

  title: string;

  order: number;

  constructor({
    title = 'default title',
    order = 0,
  }: IColumnDataFromRequestBody) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }
}

export { Column };
