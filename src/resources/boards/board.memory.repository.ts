import {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  deleteBoardTasks,
 } from '../../common/database';
 import { IBoardUpdatedBody } from './board.types';
 import { Messages } from '../../common/statusCodes';

const getAll = async () => getAllBoards();
const create = async (board: IBoardUpdatedBody) => createBoard(board);
const get = async (id: string) => {
  const board = await getBoard(id);
  if (!board) {
    throw new Error(Messages.BAD_REQUEST);
  }
  return board
};
const update = async (id: string, body:IBoardUpdatedBody) => {
  const board = await updateBoard(id, body);
  if (!board) {
    throw new Error(Messages.BAD_REQUEST);
  }
  return board
};
const delBoard = async (id: string) => {
  const board = await deleteBoard(id);
  if (!board) {
    throw new Error(Messages.BAD_REQUEST);
  }
  return board
};

const delTasks = async (id: string) => {
  const tasks = await deleteBoardTasks(id);
  if (!tasks) {
    throw new Error(Messages.BAD_REQUEST);
  }
  return tasks
};

export { getAll, create, get, update, delBoard, delTasks };
