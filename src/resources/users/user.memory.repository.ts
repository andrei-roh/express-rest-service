import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
 } from '../../common/database';
import { IUserUpdatedBody } from './user.types';

/**
  * Getting all users information
  * @returns { Promise<User[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAll = async () => getAllUsers();
/**
  * Create user
  * @params { Object } (name, login, password) - information about new User
  * User's data writes in server's memory with push method
  * @returns { Promise<User[]> } Returns response with users information
  */
const create = async (user: IUserUpdatedBody) => createUser(user);
/**
  * Getting user
  * @param { String } user's id
  * @returns { Promise<User[]|undefined> } Returns response with user's information or undefined
  */
const get = async (id: string) => {
  const user = await getUser(id);
  if (!user) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return user
};
/**
  * Update user's information
  * @param { String } user's id
  * @param { UpdatedUserBody } changed user's body
  * @returns { Promise<User[]|undefined> } Returns updated user or undefined
  */
const update = async (id: string, body: IUserUpdatedBody) => {
  const user = updateUser(id, body);
  if (!user) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return user
};
/**
  * Delete user & user's tasks
  * @param { String } user's id
  * @returns { Promise<User[]> } Returns users without deleted user and tasks without tasks of deleted user
  */
const delUser = async (id: string) => {
  const user = await deleteUser(id);
  if (!user) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return user
};

export { getAll, create, get, update, delUser };
