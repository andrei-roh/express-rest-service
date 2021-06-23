import * as repository from './user.repository';
import { IUser } from '../types';

export const getAll = async (): Promise<IUser[]> => repository.getAll();
export const getUser = async (id: string): Promise<IUser | undefined> => repository.get(id);
export const create = async (user: IUser): Promise<IUser> => repository.create(user);
export const update = async (id: string, updateBody: Partial<IUser>): Promise<IUser> =>
  repository.update(id, updateBody);
export const deleteUser = async (id: string): Promise<boolean> => repository.delUser(id);
