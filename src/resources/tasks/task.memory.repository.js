const database = require('../../common/database');

/**
  * Get all tasks
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns board's tasks
  */
const getAll = async boardId => database.getAllTasks(boardId);
/**
  * Create task
  * @params { CreatedTaskBody } (title, order, description, userId, boardId) - information about new Task
  * Task's data writes in server's memory with push method
  * @returns { Promise<Task[]> } Returns response with task information
  */
const create = async task => database.createTask(task);
/**
  * Getting task
  * @param { String } task's id
  * @returns { Promise<Task[]|undefined> } Returns response with task's information
  */
const get = async (taskId, boardId) => {
  const task = await database.getTask(taskId, boardId);
  if (!task) {
    throw new Error(`Task with id: ${taskId} was not found!`);
  }
  return task
};
/**
  * Update task's information
  * @param { String } task's id
  * @param { UpdatedTaskBody } changed task's body
  * @returns { Promise<Task[]|undefined> } Returns updated task
  */
const update = async (id, body) => {
  const task = database.updateTask(id, body);
  if (!task) {
    throw new Error(`Task with id: ${id} was not found!`);
  }
  return task
};
/**
  * Delete task
  * This function does asynchronous request DELETE to the server for delete task set task's id and board's id
  * @param { String } task's id
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns tasks without deleted task
  */
const deleteTask = async (taskId, boardId) => {
  const task = await database.deleteTask(taskId, boardId);
  if (!task) {
    throw new Error(`User with id: ${taskId} was not found!`);
  }
  return task
};

module.exports = { getAll, create, get, update, deleteTask };
