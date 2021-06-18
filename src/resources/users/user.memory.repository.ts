import { IUserUpdatedBody, IUser } from './user.types';
import { USERS, TASKS } from '../../common/data';
import { User } from './user.model';

const getAll = async (): Promise<IUser[] | []> => USERS;

const create = async (user: IUserUpdatedBody): Promise<IUser> => {
  const { name, login, password } = user;
  const createdUser = new User({ name, login, password });
  USERS.push(createdUser);
  return createdUser
};

const get = async (id: string): Promise<IUser | undefined> =>
  USERS.filter(user => user.id === id)[0];

const update = async (id: string, updateBody: IUserUpdatedBody): Promise<IUser | undefined> => {
  const user = USERS.filter(element => element.id === id)[0];
  if (user) {
    user.name = updateBody.name;
    user.login = updateBody.login;
    user.password = updateBody.password;
    return user
  }
  return undefined
};

const delUser = async (id: string) => {
  const index = USERS.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }
  USERS.splice(index, 1);
  return true;
};

const delTasks = async (userId: string) => {
  TASKS.map((task) => {
    const copyTask = task;
    if (copyTask.userId === userId) {
      copyTask.userId = null;
    }
    return copyTask;
  });
  return true;
};

export { getAll, create, get, update, delUser, delTasks };
