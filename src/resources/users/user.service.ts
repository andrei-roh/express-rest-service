import {
  getAll as getAllUsers,
  create as createUser,
  get as getUserById,
  update as updateUser,
  delUser as deleteUser,
  delTasks as deleteUserTasks,
} from './user.memory.repository';
import { IUserUpdatedBody } from './user.types';

/**
  * Getting all users information
  * @returns { Promise<User[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAll = () => getAllUsers();
/**
  * Create user
  * @params { Object } (name, login, password) - information about new User
  * User's data writes in server's memory with push method
  * @returns { Promise<User[]> } Returns response with users information
  */
const create = (user: IUserUpdatedBody) => createUser(user);
/**
  * Getting user
  * @param { String } user's id
  * @returns { Promise<User[]|undefined> } Returns response with user's information or undefined
  */
const get = (id: string) => getUserById(id);
/**
  * Update user's information
  * @param { String } user's id
  * @param { UpdatedUserBody } changed user's body
  * @returns { Promise<User[]|undefined> } Returns updated user or undefined
  */
const update = (id: string, body: IUserUpdatedBody) => updateUser(id, body);
/**
  * Delete user & user's tasks
  * @param { String } user's id
  * @returns { Promise<User[]> } Returns users without deleted user and tasks without tasks of deleted user
  */
const delUser = (id: string) => deleteUser(id);

const delTasks = (id: string) => deleteUserTasks(id);

export const usersService = { getAll, get, create, update, delUser, delTasks };
