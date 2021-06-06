import { USERS, BOARDS, TASKS } from './data';
import { IUserUpdatedBody, IUser } from '../resources/users/user.types';
import { IBoardUpdatedBody, IBoard } from '../resources/boards/board.types';
import { ITaskUpdatedBody } from '../resources/tasks/task.types';
import { User } from '../resources/users/user.model';
import { Board } from '../resources/boards/board.model';
import { Task } from '../resources/tasks/task.model';

const getAllUsers = async (): Promise<IUser[] | []> => USERS
const createUser = async (user: IUserUpdatedBody): Promise<IUser> => {
  const { name, login, password } = user;
  const createdUser = new User({ name, login, password });
  USERS.push(createdUser);
  return createdUser
}
const getUser = async (id: string): Promise<IUser | undefined> =>
  USERS.filter(user => user.id === id)[0];
const updateUser = async (id: string, updateBody: IUserUpdatedBody): Promise<IUser | undefined> => {
  const user = USERS.filter(element => element.id === id)[0];
  if(user) {
    user.name = updateBody.name;
    user.login = updateBody.login;
    user.password = updateBody.password;
    return user
  }
  return undefined
};
const deleteUser = async (id: string) => {
  const index = USERS.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }
  USERS.splice(index, 1);
  return true;
}


const getAllBoards = async () => BOARDS;
const createBoard = async (board: IBoardUpdatedBody): Promise<IBoard> => {
  const { title, columns } = board;
  const createdBoard = new Board({ title, columns });
  BOARDS.push(createdBoard);
  return createdBoard
}
const getBoard = async (id: string): Promise<IBoard | undefined> =>
  BOARDS.filter(board => board.id === id)[0];
const updateBoard = async (id: string, updateBody: IBoardUpdatedBody): Promise<IBoard | undefined> => {
  const board = BOARDS.filter(element => element.id === id)[0];
  if (board) {
    board.title = updateBody.title;
    board.columns = updateBody.columns;
    return board
  }
  return undefined
};
const deleteBoard = async (id: string) => {
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  BOARDS.splice(index, 1);
  return true;
}

const getAllTasks = async () => TASKS;
const createTask = async (task: ITaskUpdatedBody) => {
  const { title, order, description, userId, boardId, columnId } = task;
  const createdTask = new Task({ title, order, description, userId, boardId, columnId });
  TASKS.push(createdTask);
  return createdTask;
}
const getTask = async (taskId: string, boardId: string) => TASKS.find(
  task => task.id === taskId && task.boardId === boardId
);
const updateTask = (id: string, boardId: string, updateBody: ITaskUpdatedBody) => {
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
const deleteTask = async (taskId: string, boardId: string) => {
  const index = TASKS.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index < 0) {
    return null;
  }
  TASKS.splice(index, 1);
  return true
}

const deleteUserTasks = async (userId: string) => {
  TASKS.map((task) => {
    const copyTask = task;
    if (copyTask.userId === userId) {
      copyTask.userId = null;
    }
    return copyTask;
  });
  return true;
}

const deleteBoardTasks = async (boardId: string) => {
  TASKS.map((task) => {
    const copyTask = task;
    if (copyTask.boardId === boardId) {
      copyTask.boardId = null;
    }
    return copyTask;
  });
  return true;
}

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteUserTasks,
  deleteBoardTasks,
};
