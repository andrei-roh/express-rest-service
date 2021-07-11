import { Injectable } from '@nestjs/common';
import { getCheckUser } from 'src/resources/users/user.utils';
import { UsersService } from 'src/resources/users/user.service';
import { LoginUser } from 'src/resources/login/login.user';
import { ILogin } from 'src/resources/login/login.interface';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/resources/users/user.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUser: LoginUser): Promise<IUser | null> {
    const user = await this.usersService.getUserByLogin(loginUser.login);
    if (user) {
      const truePassword = await getCheckUser(user, loginUser.password);
      if (truePassword) {
        const { id, name, login } = user;
        return { id, name, login };
      }
    }
    return null;
  }

  async login(user: IUser): Promise<{ message: string; token: string }> {
    const { id, login } = user;
    const res: ILogin = { id, login };
    return {
      message: 'Authorized successfully',
      token: this.jwtService.sign(res),
    };
  }
}
