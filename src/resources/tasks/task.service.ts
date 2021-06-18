import {
  getAll as getAllTasks,
  create as createTask,
  get as getTask,
  update as updateTask,
  delTask as deleteTask
} from './task.memory.repository';
 import { ITaskUpdatedBody } from './task.types';

const getAll = () => getAllTasks();
const create = (task: ITaskUpdatedBody) => createTask(task);
const get = (taskId: string, boardId: string) => getTask(taskId, boardId);
const update = (id: string, boardId: string, body: ITaskUpdatedBody) => updateTask(id, boardId, body);
const delTask = (taskId: string, boardId: string) => deleteTask(taskId, boardId);

export const tasksService = { getAll, create, get, update, delTask };
