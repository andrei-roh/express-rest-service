import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
 } from '../../common/database';
 import { ITaskUpdatedBody } from './task.types';

/**
  * Get all tasks
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns board's tasks
  */
const getAll = async () => getAllTasks();
/**
  * Create task
  * @params { CreatedTaskBody } (title, order, description, userId, boardId) - information about new Task
  * Task's data writes in server's memory with push method
  * @returns { Promise<Task[]> } Returns response with task information
  */
const create = async (task: ITaskUpdatedBody) => createTask(task);
/**
  * Getting task
  * @param { String } task's id
  * @returns { Promise<Task[]|undefined> } Returns response with task's information
  */
const get = async (taskId: string, boardId: string) => {
  const task = await getTask(taskId, boardId);
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
const update = async (id: string, boardId: string, body: ITaskUpdatedBody) => {
  const task = updateTask(id, boardId, body);
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
const delTask = async (taskId: string, boardId: string) => {
  const task = await deleteTask(taskId, boardId);
  if (!task) {
    throw new Error(`User with id: ${taskId} was not found!`);
  }
  return task
};

module.exports = { getAll, create, get, update, delTask };
