import { v4 as uuidv4 } from 'uuid';
import {
  IUserForResponse,
  IUserUpdatedBody,
  IUser,
} from './user.types';

/**
  * Create user's class.
  * @typedef { Object } user - User's information
  * @param { String } user.id - User's id. Create with uuid version 4
  * @param { String } user.name - User's name
  * @param { String } user.login - User's login
  * @param { String } user.password - User's password
  */
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
