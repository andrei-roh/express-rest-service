import { ColumnCreate } from 'src/resources/boards/column.create';
import { IsString, IsArray } from 'class-validator';

export class BoardCreate {
  @IsString()
  title: string;

  @IsArray()
  columns: ColumnCreate[];
}
