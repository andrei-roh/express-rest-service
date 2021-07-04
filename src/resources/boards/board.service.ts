import * as repository from './board.repository';
import { IBoard } from '../types';

export const getAll = async (): Promise<Array<IBoard>> => repository.getAll();
export const getBoard = async (id: string): Promise<IBoard | undefined> => repository.get(id);
export const create = async (board: IBoard): Promise<IBoard> => repository.create(board);
export const update = async (id: string, updateBody: Partial<IBoard>): Promise<IBoard> => repository.update(id, updateBody);
export const deleteBoard = async (id: string): Promise<boolean> => repository.delBoard(id);
