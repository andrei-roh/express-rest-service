import { v4 as uuidv4 } from 'uuid';
import {
  IUserForResponse,
  IUserUpdatedBody,
  IUser,
} from './user.types';

class User {

  id: string;

  name: string;

  login: string;

  password: string;

  constructor(user: IUserUpdatedBody) {
    const { name, login, password } = user;
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUserForResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };
