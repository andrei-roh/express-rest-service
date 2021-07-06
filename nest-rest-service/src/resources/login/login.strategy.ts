import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from './login.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super();
  }

  async validate(username: string, pass: string) {
    const login = username;
    const password = pass;
    const userLoginDto = { login, password }

    const user = await this.loginService.validateUser(userLoginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
