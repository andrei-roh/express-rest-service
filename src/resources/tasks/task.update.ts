import { PartialType } from '@nestjs/mapped-types';
import { TaskCreate } from './task.create';
import { IsUUID, ValidateIf } from 'class-validator';

export class TaskUpdate extends PartialType(TaskCreate) {
  @ValidateIf(obj => obj.id !== undefined)

  @IsUUID()
  id?: string;
}
