 import { ITaskUpdatedBody } from './task.types';
 import { TASKS } from '../../common/data';
 import { Task } from './task.model';


const getAll = async () => TASKS;

const create = async (task: ITaskUpdatedBody) => {
  const { title, order, description, userId, boardId, columnId } = task;
  const createdTask = new Task({ title, order, description, userId, boardId, columnId });
  TASKS.push(createdTask);
  return createdTask;
};

const get = async (taskId: string, boardId: string) => TASKS.find(
  task => task.id === taskId && task.boardId === boardId
);

const update = async (id: string, boardId: string, updateBody: ITaskUpdatedBody) => {
  const task = TASKS.filter(element => element.id === id && element.boardId === boardId)[0];
  if (task) {
    task.title = updateBody.title;
    task.order = updateBody.order;
    task.description = updateBody.description;
    task.userId = updateBody.userId;
    task.boardId = updateBody.boardId;
    task.columnId = updateBody.columnId;
    return task
  }
  return undefined
};

const delTask = async (taskId: string, boardId: string) => {
  const index = TASKS.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index < 0) {
    return null;
  }
  TASKS.splice(index, 1);
  return true
};

export { getAll, create, get, update, delTask };
