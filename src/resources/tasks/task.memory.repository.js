const database = require('../../common/database');

const getAll = async boardId => database.getAllTasks(boardId);

const create = async task => database.createTask(task);

const get = async (taskId, boardId) => {
  const task = await database.getTask(taskId, boardId);
  if (!task) {
    throw new Error(`Task with id: ${taskId} was not found!`);
  }
  return task
};

const update = async (id, body) => {
  const task = database.updateTask(id, body);
  if (!task) {
    throw new Error(`Task with id: ${id} was not found!`);
  }
  return task
};

const deleteTask = async (taskId, boardId) => {
  const task = await database.deleteTask(taskId, boardId);
  if (!task) {
    throw new Error(`User with id: ${taskId} was not found!`);
  }
  return task
};

module.exports = { getAll, create, get, update, deleteTask };
