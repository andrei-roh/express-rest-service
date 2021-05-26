const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [];
const boards = [];
const tasks = [];

users.push(new User(), new User(), new User());
boards.push(new Board(), new Board(), new Board());
tasks.push(new Task(), new Task(), new Task())

/**
  * Function of getting all users information
  * This function does asynchronous request GET to the server for getting all users information
  * @returns { Object } Returns response takes a copy of information and saves in new memory part
  */
const getAllUsers = async () => {
  const res = JSON.parse(JSON.stringify(users));
  return res
}
/**
  * Function of create user
  * This function does asynchronous request POST to the server for create user with set parameters
  * @params { Object } (name, login, password)
  * User's data writes in server's memory with push method
  * @returns { Object } Returns response with users information
  */
const createUser = async user => {
  users.push(user);
  return user
}
/**
  * Function of getting user
  * This function does asynchronous request GET to the server for getting user with set id
  * @param { String } user's id
  * @returns { Object } Returns response with user's information
  */
const getUser = async id => users.filter(element => element.id === id)[0];
/**
  * Function of update user's information
  * This function does asynchronous request PUT to the server for update user with set id
  * @param { String, Object } user's id and changed user's body
  * @returns { Object } Returns updated user
  */
const updateUser = async (id, updateBody) => {
  const user = users.filter(element => element.id === id)[0];
  user.name = updateBody.name;
  user.login = updateBody.login;
  user.password = updateBody.password;
  return user
};
/**
  * Function of delete user & user's tasks
  * This function does asynchronous request DELETE to the server for delete user & user's tasks with set id
  * @param { String } user's id
  * @returns { Object } Returns users without deleted user and tasks without tasks of deleted user
  */
const deleteUser = async (id) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === id) {
      tasks[i].userId = null;
      i -= 1;
    }
  }
  return users.splice(users.filter(element => element.id === id), 1)
}


/**
  * Function of get all boards
  * This function does asynchronous request GET to the server for getting all boards information
  * @returns { Object } Returns response takes a copy of information and saves in new memory part
  */
const getAllBoards = async () => {
  const res = JSON.parse(JSON.stringify(boards));
  return res
}
/**
  * Function of create board
  * This function does asynchronous request POST to the server for create board with set parameters
  * @params { String, Object } (title, column)
  * Board's data writes in server's memory with push method
  * @returns { Object } Returns response with board information
  */
const createBoard = async board => {
  boards.push(board);
  return board
}
/**
  * Function of getting board
  * This function does asynchronous request GET to the server for getting board with set boardId
  * @param { String } board's id
  * @returns { Object } Returns response with board's information
  */
const getBoard = async id => boards.filter(element => element.id === id)[0];
/**
  * Function of update board's information
  * This function does asynchronous request PUT to the server for update board with set id
  * @param { String, Object } board's id and changed board's body
  * @returns { Object } Returns updated board
  */
const updateBoard = async (id, updateBody) => {
  const board = boards.filter(element => element.id === id)[0];
  board.title = updateBody.title;
  board.columns = updateBody.columns;
  return board
};
/**
  * Function of delete board & boards's tasks
  * This function does asynchronous request DELETE to the server for delete board & board's tasks with set id
  * @param { String } board's id
  * @returns { Object } Returns boards without deleted board and tasks without tasks of deleted board
  */
const deleteBoard = async (id) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].boardId === id) {
      tasks.splice(i, 1);
      i -= 1;
    }
  }
  return boards.splice(boards.filter(element => element.id === id), 1)
}

/**
  * Function of get all tasks
  * This function does asynchronous request GET to the server for getting all board's tasks information
  * @param { String } board's id
  * @returns { Object } Returns board's tasks
  */
const getAllTasks = async (boardId) => tasks.filter(element => element.boardId === boardId);
/**
  * Function of create task
  * This function does asynchronous request POST to the server for create task with set parameters
  * @params { Object } (title, order, description, userId, boardId)
  * Task's data writes in server's memory with push method
  * @returns { Object } Returns response with task information
  */
const createTask = async (task) => {
  tasks.push(task);
  return task;
}
/**
  * Function of getting task
  * This function does asynchronous request GET to the server for getting task with set id
  * @param { String } task's id
  * @returns { Object } Returns response with task's information
  */
const getTask = async (taskId, boardId) => tasks.find(
  element => element.id === taskId && element.boardId === boardId
);
/**
  * Function of update task's information
  * This function does asynchronous request PUT to the server for update task with set id
  * @param { String, Object } task's id and changed task's body
  * @returns { Object } Returns updated task
  */
const updateTask = (id, updateBody) => {
  const task = tasks.filter(element => element.id === id)[0];
  task.title = updateBody.title;
  task.order = updateBody.order;
  task.description = updateBody.description;
  task.userId = updateBody.userId;
  task.boardId = updateBody.boardId;
  task.columnId = updateBody.columnId;
  return task
};
/**
  * Function of delete task
  * This function does asynchronous request DELETE to the server for delete task set task's id and board's id
  * @param { String, String } task's id and board's id
  * @returns { Object } Returns tasks without deleted task
  */
const deleteTask = async (taskId, boardId) => tasks.splice(
  tasks.filter(element => element.id === taskId && element.boardId === boardId), 1
);

module.exports = {
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
