import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, ValidateIf } from 'class-validator';
import { UserCreate } from './user.create';

export class UserUpdate extends PartialType(UserCreate) {
  @ValidateIf(obj => obj.id !== undefined)
  
  @IsUUID()
  id?: string;
}