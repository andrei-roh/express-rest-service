import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
 } from '../../common/database';
 import { ITaskUpdatedBody } from './task.types';

/**
  * Get all tasks
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns board's tasks
  */
const getAll = (boardId: string) => getAllTasks(boardId);
/**
  * Create task
  * @params { CreatedTaskBody } (title, order, description, userId, boardId) - information about new Task
  * Task's data writes in server's memory with push method
  * @returns { Promise<Task[]> } Returns response with task information
  */
const create = (task: ITaskUpdatedBody) => createTask(task);
/**
  * Getting task
  * @param { String } task's id
  * @returns { Promise<Task[]|undefined> } Returns response with task's information
  */
const get = (taskId: string, boardId: string) => getTask(taskId, boardId);
/**
  * Update task's information
  * @param { String } task's id
  * @param { UpdatedTaskBody } changed task's body
  * @returns { Promise<Task[]|undefined> } Returns updated task
  */
const update = (id: string, body: ITaskUpdatedBody) => updateTask(id, body);
/**
  * Delete task
  * This function does asynchronous request DELETE to the server for delete task set task's id and board's id
  * @param { String } task's id
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns tasks without deleted task
  */
const del = (taskId: string, boardId: string) => deleteTask(taskId, boardId);

export const tasksService = { getAll, create, get, update, del };
