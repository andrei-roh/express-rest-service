import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteUserTasks,
 } from '../../common/database';
import { IUserUpdatedBody } from './user.types';
import { Messages } from '../../common/statusCodes';

const getAll = async () => getAllUsers();
const create = async (user: IUserUpdatedBody) => createUser(user);
const get = async (id: string) => {
  const user = await getUser(id);
  if (!user) {
    throw new Error(Messages.NOT_FOUND);
  }
  return user
};
const update = async (id: string, body: IUserUpdatedBody) => {
  const user = updateUser(id, body);
  if (!user) {
    throw new Error(Messages.NOT_FOUND);
  }
  return user
};
const delUser = async (id: string) => {
  const user = await deleteUser(id);
  if (!user) {
    throw new Error(Messages.NOT_FOUND);
  }
  return user
};
const delTasks = async (id: string) => {
  const tasks = await deleteUserTasks(id);
  if (!tasks) {
    throw new Error(Messages.NOT_FOUND);
  }
  return tasks
};

export { getAll, create, get, update, delUser, delTasks };
