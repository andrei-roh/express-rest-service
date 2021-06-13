import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
 } from '../../common/database';
 import { ITaskUpdatedBody } from './task.types';
 import { Messages } from '../../common/statusCodes';

const getAll = async () => getAllTasks();
const create = async (task: ITaskUpdatedBody) => createTask(task);
const get = async (taskId: string, boardId: string) => {
  const task = await getTask(taskId, boardId);
  if (!task) {
    throw new Error(Messages.NOT_FOUND);
  }
  return task
};
const update = async (id: string, boardId: string, body: ITaskUpdatedBody) => {
  const task = updateTask(id, boardId, body);
  if (!task) {
    throw new Error(Messages.NOT_FOUND);
  }
  return task
};
const delTask = async (taskId: string, boardId: string) => {
  const task = await deleteTask(taskId, boardId);
  if (!task) {
    throw new Error(Messages.NOT_FOUND);
  }
  return task
};

module.exports = { getAll, create, get, update, delTask };
