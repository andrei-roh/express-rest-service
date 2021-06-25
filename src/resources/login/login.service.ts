import * as repository from './login.repository';
import { IUser, ILogin } from '../types';

export const loginUser = async (userData: ILogin): Promise<IUser | undefined> => repository.loginUser(userData);
