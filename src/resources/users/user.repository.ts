import { getConnectionToDatabase } from '../../common/database';
import { User } from './user.model';
import { IUser } from '../types';

const repository = getConnectionToDatabase()!.getRepository(User);

export const getAll = async () => repository.find();

export const get = async (id: string) => repository.findOne(id);

export const create = async (user: IUser) => repository.save(user);

export const update = async (id: string, updateBody: Partial<IUser>) => {
  await repository.update(id, updateBody);
  const user = await get(id);
  return user!
}

export const delUser = async (id: string) => {
  const res = await repository.delete(id)
  return !!res.affected
}
