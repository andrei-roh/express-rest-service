 import { IBoardUpdatedBody, IBoard } from './board.types';
 import { BOARDS, TASKS } from '../../common/data';
 import { Board } from './board.model';

const getAll = async () => BOARDS;

const create = async (board: IBoardUpdatedBody): Promise<IBoard> => {
  const { title, columns } = board;
  const createdBoard = new Board({ title, columns });
  BOARDS.push(createdBoard);
  return createdBoard
};

const get = async (id: string): Promise<IBoard | undefined> =>
  BOARDS.filter(board => board.id === id)[0];

const update = async (id: string, updateBody: IBoardUpdatedBody): Promise<IBoard | undefined> => {
  const board = BOARDS.filter(element => element.id === id)[0];
  if (board) {
    board.title = updateBody.title;
    board.columns = updateBody.columns;
    return board
  }
  return undefined
};

const delBoard = async (id: string) => {
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  BOARDS.splice(index, 1);
  return true;
};

const delTasks = async (boardId: string) => {
  TASKS.map((task) => {
    const copyTask = task;
    if (copyTask.boardId === boardId) {
      copyTask.boardId = null;
    }
    return copyTask;
  });
  return true;
};

export { getAll, create, get, update, delBoard, delTasks };
