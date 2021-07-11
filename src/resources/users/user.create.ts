import { IsString } from 'class-validator';

export class UserCreate {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
