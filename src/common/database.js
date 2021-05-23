const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [];
const boards = [];
const tasks = [];

users.push(new User(), new User(), new User());
boards.push(new Board(), new Board(), new Board());
tasks.push(new Task(), new Task(), new Task())

const getAllUsers = async () => {
  const res = JSON.parse(JSON.stringify(users));
  return res
}
const createUser = async user => {
  users.push(user);
  return user
}
const getUser = async id => users.filter(element => element.id === id)[0];
const updateUser = async (id, updateBody) => {
  const user = users.filter(element => element.id === id)[0];
  user.name = updateBody.name;
  user.login = updateBody.login;
  user.password = updateBody.password;
  return user
};
const deleteUser = async (id) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === id) {
      tasks[i].userId = null;
      i -= 1;
    }
  }
  return users.splice(users.filter(element => element.id === id), 1)
}


const getAllBoards = async () => {
  const res = JSON.parse(JSON.stringify(boards));
  return res
}
const createBoard = async board => {
  boards.push(board);
  return board
}
const getBoard = async id => boards.filter(element => element.id === id)[0];
const updateBoard = async (id, updateBody) => {
  const board = boards.filter(element => element.id === id)[0];
  board.title = updateBody.title;
  board.columns = updateBody.columns;
  return board
};
const deleteBoard = async (id) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].boardId === id) {
      tasks.splice(i, 1);
      i -= 1;
    }
  }
  return boards.splice(boards.filter(element => element.id === id), 1)
}


const getAllTasks = async (boardId) => {
  const res = tasks.filter(element => element.id === boardId);
  return res
}
const createTask = async (task) => {
  tasks.push(task);
  return task;
}
const getTask = async (taskId, boardId) => tasks.find(element => element.id === taskId && element.boardId === boardId);
const updateTask = (id, updateBody, boardId) => {
  const task = tasks.filter(element => element.id === id && element.boardId === boardId);
  task.title = updateBody.title;
  task.order = updateBody.order;
  task.description = updateBody.description;
  task.userId = updateBody.userId;
  task.boardId = updateBody.boardId;
  task.columnId = updateBody.columnId;
  return task
};
const deleteTask = async (taskId, boardId) => tasks.splice(tasks.filter(element => element.id === taskId && element.boardId === boardId), 1)

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
