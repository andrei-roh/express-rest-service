import * as repository from './login.repository';
import { IUser } from '../types';

export const loginUser = async (login: string): Promise<IUser | undefined> => repository.loginUser(login);
