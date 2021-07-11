import { PartialType } from '@nestjs/mapped-types';
import { ColumnCreate } from './column.create';
import { IsUUID, ValidateIf } from 'class-validator';

export class ColumnUpdate extends PartialType(ColumnCreate) {
  @ValidateIf((obj) => obj.id !== undefined)
  @IsUUID()
  id?: string;
}