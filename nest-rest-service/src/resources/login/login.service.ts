import { Injectable } from '@nestjs/common';
import { getCheckUser } from '../users/user.utils';
import { UserService } from '../users/user.service';
import { LoginUser } from './login.user';
import { ILogin } from './login.interface';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/user.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(loginUser: LoginUser): Promise<IUser | null> {
    const user = await this.usersService.getUserByLogin(loginUser.login);
    if (user) {
      const truePassword = await getCheckUser(user, loginUser.password);
      if (truePassword) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: IUser): Promise<{ message: string, token: string; }> {
    const { id, login } = user;
    const payload: ILogin = { id, login };
    return {
      message: 'Authorized successfully',
      token: this.jwtService.sign(payload),
    };
  }
}
