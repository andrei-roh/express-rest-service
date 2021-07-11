import { IsString } from 'class-validator';

export class LoginUser {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
