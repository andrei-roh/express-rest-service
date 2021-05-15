const database = require('../../common/database');

const getAll = async boardId => database.getAllTasks(boardId);

const create = async task => database.createTask(task);

const get = async id => {
  const task = await database.getTask(id);
  if (!task) {
    throw new Error(`Task with id: ${id} was not found!`);
  }
  return task
};

const update = async (id, body) => {
  const task = await database.updateTask(id, body);
  if (!task) {
    throw new Error(`Task with id: ${id} was not found!`);
  }
  return task
};

const deleteTask = async id => {
  const task = await database.deleteTask(id);
  if (!task) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return task
};

module.exports = { getAll, create, get, update, deleteTask };
