import * as bcrypt from 'bcrypt';
import { UserCreate } from './user.create';
import { UserUpdate } from './user.update';
import { User } from './user.model';

export const getCreateUser = async (
  userCreate: UserCreate,
): Promise<UserCreate> => {
  const { name, login } = userCreate;
  let { password } = userCreate;
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);
  return { name, login, password };
};

export const getUpdateUser = async (
  id: string,
  userUpdate: UserUpdate,
): Promise<UserUpdate> => {
  const { name, login } = userUpdate;
  let { password } = userUpdate;
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);
  return { id, name, login, password };
};

export const getCheckUser = async (
  user: User,
  password: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, user.password);
};
