import { PartialType } from '@nestjs/mapped-types';
import { BoardCreate } from './board.create';
import { IsUUID, ValidateIf } from 'class-validator';

export class BoardUpdate extends PartialType(BoardCreate) {
  @ValidateIf((obj) => obj.id !== undefined)
  @IsUUID()
  id?: string;
}
