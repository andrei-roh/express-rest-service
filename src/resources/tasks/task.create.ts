import { IsString, IsInt, ValidateIf, IsUUID } from 'class-validator';

export class TaskCreate {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @ValidateIf((obj) => obj.userId !== null)
  @IsUUID()
  userId: string | null;

  @ValidateIf((obj) => obj.boardId !== null)
  @IsUUID()
  boardId: string | null;

  @ValidateIf((obj) => obj.columnId !== null && obj.columnId !== undefined)
  @IsUUID()
  columnId: string | null;
}
