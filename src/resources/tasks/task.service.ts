import * as repository from './task.repository';
import { ITask } from './task.types';

export const getAll = (boardId: string): Promise<ITask[]> => repository.getAll(boardId);
export const getTask = (boardId: string, taskId: string): Promise<ITask | undefined> =>
  repository.get(boardId, taskId);
export const create = (task: ITask): Promise<ITask> => repository.create(task);
export const update = (boardId: string, taskId: string, data: Partial<ITask>): Promise<ITask> =>
  repository.update(boardId, taskId, data);
export const deleteTask = (taskId: string): Promise<boolean> => repository.delTask(taskId);
