import { USERS, BOARDS, TASKS } from './data';
import { IUserUpdatedBody } from '../resources/users/user.types';
import { IBoardUpdatedBody } from '../resources/boards/board.types';
import { ITaskUpdatedBody } from '../resources/tasks/task.types';
import { User } from '../resources/users/user.model';
import { Board } from '../resources/boards/board.model';
import { Task } from '../resources/tasks/task.model';

/**
  * Getting all users information
  * This function does asynchronous request GET to the server for getting all users information
  * @returns { Promise<User[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAllUsers = async () => USERS
/**
  * Create user
  * This function does asynchronous request POST to the server for create user with set parameters
  * @params { ICreatedUserBody } (name, login, password) - information about new User
  * User's data writes in server's memory with push method
  * @returns { Promise<User[]> } Returns response with users information
  */
const createUser = async (user: IUserUpdatedBody) => {
  const { name, login, password } = user;
  const createdUser = new User({ name, login, password });
  USERS.push(createdUser);
  return createdUser
}
/**
  * Getting user
  * This function does asynchronous request GET to the server for getting user with set id
  * @param { String } user's id
  * @returns { Promise<User[]|undefined> } Returns response with user's information or undefined
  */
const getUser = async (id: string) => USERS.filter(element => element.id === id)[0];
/**
  * Update user's information
  * This function does asynchronous request PUT to the server for update user with set id
  * @param { String } user's id
  * @param { UpdatedUserBody } changed user's body
  * @returns { Promise<User[]|undefined> } Returns updated user or undefined
  */
const updateUser = async (id: string, updateBody: IUserUpdatedBody) => {
  const user = USERS.filter(element => element.id === id)[0];
  user.name = updateBody.name;
  user.login = updateBody.login;
  user.password = updateBody.password;
  return user
};
/**
  * Delete user & user's tasks
  * This function does asynchronous request DELETE to the server for delete user & user's tasks with set id
  * @param { String } user's id
  * @returns { Promise<User[]> } Returns users without deleted user and tasks without tasks of deleted user
  */
const deleteUser = async (id: string) => {
  for (let i = 0; i < TASKS.length; i += 1) {
    if (TASKS[i].userId === id) {
      TASKS[i].userId = null;
      i -= 1;
    }
  }
  // return USERS.splice(USERS.filter(element => element.id === id).length, 1)
  const index = USERS.findIndex((user) => user.id === id);
  return USERS.splice(index, 1);
}


/**
  * Get all boards
  * This function does asynchronous request GET to the server for getting all boards information
  * @returns { Promise<Board[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAllBoards = async () => BOARDS;
/**
  * Create board
  * This function does asynchronous request POST to the server for create board with set parameters
  * @params { CreatedBoardBody } (title, column) - information about new Board
  * Board's data writes in server's memory with push method
  * @returns { Promise<Board[]> } Returns response with board information
  */
const createBoard = async (board: IBoardUpdatedBody) => {
  const { title, columns } = board;
  const createdBoard = new Board({ title, columns });
  BOARDS.push(createdBoard);
  return createdBoard
}
/**
  * Getting board by id
  * This function does asynchronous request GET to the server for getting board with set boardId
  * @param { String } board's id
  * @returns { Promise<Board|undefined> } Returns response with board's information or undefined
  */
const getBoard = async (id: string) => BOARDS.filter(element => element.id === id)[0];
/**
  * Update board's information
  * This function does asynchronous request PUT to the server for update board with set id
  * @param { String } board's id
  * @param { UpdatedBoardBody } changed board's body
  * @returns { Promise<Board|undefined> } Returns updated board or undefined
  */
const updateBoard = async (id: string, updateBody: IBoardUpdatedBody) => {
  const board = BOARDS.filter(element => element.id === id)[0];
  board.title = updateBody.title;
  board.columns = updateBody.columns;
  return board
};
/**
  * Delete board & boards's tasks
  * This function does asynchronous request DELETE to the server for delete board & board's tasks with set id
  * @param { String } board's id
  * @returns { Promise<Board[]> } Returns boards without deleted board and tasks without tasks of deleted board
  */
const deleteBoard = async (id: string) => {
  TASKS.filter(element => element.boardId !== id);
  return BOARDS.splice(BOARDS.findIndex(element => element.id !== id))
}

/**
  * Get all tasks
  * This function does asynchronous request GET to the server for getting all board's tasks information
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns board's tasks
  */
const getAllTasks = async (boardId: string) => TASKS.filter(element => element.boardId === boardId);
/**
  * Create task
  * This function does asynchronous request POST to the server for create task with set parameters
  * @params { CreatedTaskBody } (title, order, description, userId, boardId) - information about new Task
  * Task's data writes in server's memory with push method
  * @returns { Promise<Task[]> } Returns response with task information
  */
const createTask = async (task: ITaskUpdatedBody) => {
  const { title, order, description, userId, boardId, columnId } = task;
  const createdTask = new Task({ title, order, description, userId, boardId, columnId });
  TASKS.push(createdTask);
  return createdTask;
}
/**
  * Getting task
  * This function does asynchronous request GET to the server for getting task with set id
  * @param { String } task's id
  * @returns { Promise<Task[]|undefined> } Returns response with task's information
  */
const getTask = async (taskId: string, boardId: string) => TASKS.find(
  element => element.id === taskId && element.boardId === boardId
);
/**
  * Update task's information
  * This function does asynchronous request PUT to the server for update task with set id
  * @param { String } task's id
  * @param { UpdatedTaskBody } changed task's body
  * @returns { Promise<Task[]|undefined> } Returns updated task
  */
const updateTask = (id: string, updateBody: ITaskUpdatedBody) => {
  const task = TASKS.filter(element => element.id === id)[0];
  task.title = updateBody.title;
  task.order = updateBody.order;
  task.description = updateBody.description;
  task.userId = updateBody.userId;
  task.boardId = updateBody.boardId;
  task.columnId = updateBody.columnId;
  return task
};
/**
  * Delete task
  * This function does asynchronous request DELETE to the server for delete task set task's id and board's id
  * @param { String } task's id
  * @param { String } board's id
  * @returns { Promise<Task[]> } Returns tasks without deleted task
  */
const deleteTask = async (taskId: string, boardId: string) =>
  TASKS.splice(TASKS.findIndex(element => element.id !== taskId && element.boardId !== boardId))

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
  deleteTask
};
