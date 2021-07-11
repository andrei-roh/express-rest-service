import { IsString, IsInt } from 'class-validator';

export class ColumnCreate {
  @IsString()
  title: string;

  @IsInt()
  order: number;
}
