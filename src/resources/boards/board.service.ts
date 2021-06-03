import {
  getAll as getAllBoards,
  create as createBoard,
  get as getBoardById,
  update as updateBoard,
  delBoard as deleteBoard,
  delTasks as deleteBoardTasks,
} from './board.memory.repository';
import { IBoardUpdatedBody } from './board.types';
const getAll = () => getAllBoards();
const create = (board: IBoardUpdatedBody) => createBoard(board);
const get = (id: string) => getBoardById(id);
const update = (id: string, body: IBoardUpdatedBody) => updateBoard(id, body);
const delBoard = (id: string) => deleteBoard(id);
const delTasks = (id: string) => deleteBoardTasks(id);

export const boardsService = { getAll, create, get, update, delBoard, delTasks };
