import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from './login.service';
import { IUser } from '../users/user.interface';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<IUser> {
    const loginUser = { login, password }

    const user = await this.loginService.validateUser(loginUser);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
