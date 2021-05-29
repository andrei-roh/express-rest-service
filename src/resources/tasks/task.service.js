const tasksRepo = require('./task.memory.repository');

/**
  * Get all tasks
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns board's tasks
  */
const getAll = boardId => tasksRepo.getAll(boardId);
/**
  * Create task
  * @params { CreatedTaskBody } (title, order, description, userId, boardId) - information about new Task
  * Task's data writes in server's memory with push method
  * @returns { Promise<Task[]> } Returns response with task information
  */
const create = task => tasksRepo.create(task);
/**
  * Getting task
  * @param { String } task's id
  * @returns { Promise<Task[]|undefined> } Returns response with task's information
  */
const get = (taskId, boardId) => tasksRepo.get(taskId, boardId);
/**
  * Update task's information
  * @param { String } task's id
  * @param { UpdatedTaskBody } changed task's body
  * @returns { Promise<Task[]|undefined> } Returns updated task
  */
const update = (id, body) => tasksRepo.update(id, body);
/**
  * Delete task
  * This function does asynchronous request DELETE to the server for delete task set task's id and board's id
  * @param { String } task's id
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns tasks without deleted task
  */
const deleteTask = (taskId, boardId) => tasksRepo.deleteTask(taskId, boardId);

module.exports = { getAll, create, get, update, deleteTask };
