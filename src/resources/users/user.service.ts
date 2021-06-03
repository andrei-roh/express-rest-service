import {
  getAll as getAllUsers,
  create as createUser,
  get as getUserById,
  update as updateUser,
  delUser as deleteUser,
  delTasks as deleteUserTasks,
} from './user.memory.repository';
import { IUserUpdatedBody } from './user.types';

const getAll = () => getAllUsers();
const create = (user: IUserUpdatedBody) => createUser(user);
const get = (id: string) => getUserById(id);
const update = (id: string, body: IUserUpdatedBody) => updateUser(id, body);
const delUser = (id: string) => deleteUser(id);
const delTasks = (id: string) => deleteUserTasks(id);

export const usersService = { getAll, get, create, update, delUser, delTasks };
