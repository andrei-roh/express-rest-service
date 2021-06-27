import { getConnectionToDatabase } from '../../common/database';
import { Board } from './board.model';
import { IBoard } from './board.types';

const repository = getConnectionToDatabase()!.getRepository(Board);

export const getAll = async (): Promise<Array<IBoard>> => repository.find();

export const get = async (id: string): Promise<IBoard | undefined> => repository.findOne(id);

export const create = async (board: IBoard): Promise<IBoard> => repository.save(board)

export const update = async (id: string, updateBody: Partial<IBoard>): Promise<IBoard> => {
  const { columns, ...otherBody } = updateBody
  await repository.update(id, otherBody)
  const board = await get(id)
  return board!
}

export const delBoard = async (id: string): Promise<boolean> => {
  const res = await repository.delete(id)
  return !!res.affected
};
