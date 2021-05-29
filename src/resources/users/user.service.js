const usersRepo = require('./user.memory.repository');

/**
  * Getting all users information
  * @returns { Promise<User[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAll = () => usersRepo.getAll();
/**
  * Create user
  * @params { Object } (name, login, password) - information about new User
  * User's data writes in server's memory with push method
  * @returns { Promise<User[]> } Returns response with users information
  */
const create = user => usersRepo.create(user);
/**
  * Getting user
  * @param { String } user's id
  * @returns { Promise<User[]|undefined> } Returns response with user's information or undefined
  */
const get = id => usersRepo.get(id);
/**
  * Update user's information
  * @param { String } user's id
  * @param { UpdatedUserBody } changed user's body
  * @returns { Promise<User[]|undefined> } Returns updated user or undefined
  */
const update = (id, body) => usersRepo.update(id, body);
/**
  * Delete user & user's tasks
  * @param { String } user's id
  * @returns { Promise<User[]> } Returns users without deleted user and tasks without tasks of deleted user
  */
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, create, get, update, deleteUser };
