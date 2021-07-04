import { getConnectionToDatabase } from '../../common/database';
import { Task } from './task.model';
import { ITask } from '../types';

const repository = getConnectionToDatabase()!.getRepository(Task);

export const getAll = async (boardId: string): Promise<ITask[]> => repository.find({ where: { boardId } })

export const get = async (boardId: string, taskId: string): Promise<ITask | undefined> => repository.findOne(taskId, { where: { boardId } })

export const create = async (task: ITask): Promise<ITask> => repository.save(task)

export const update = async (boardId: string, taskId: string, data: Partial<ITask>): Promise<ITask> => {
  await repository.update(taskId, data)
  const task = await get(boardId, taskId)
  return task!
}

export const delTask = async (taskId: string): Promise<boolean> => {
  const res = await repository.delete(taskId)
  return !!res.affected
}
