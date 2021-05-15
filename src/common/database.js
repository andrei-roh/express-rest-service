const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/task.model');

const database = [];
const boards = [];
const tasks = [];

database.push(new User(), new User(), new User(), new User());
boards.push(new Board(), new Board());


const getAllUsers = async () => {
  const res = JSON.parse(JSON.stringify(database));
  return res
  // return database.slice(0)
}
const createUser = async user => {
  database.push(user);
  return user
}
const getUser = async id => database.filter(element => element.id === id)[0];
const updateUser = async (id, updateBody) => {
  const user = database.filter(element => element.id === id)[0];
  user.name = updateBody.name;
  user.login = updateBody.login;
  user.password = updateBody.password;
  return user
};
const deleteUser = async (id) => {
  tasks.map((element) => {
    if (element.userId === id) {
      return element.userId = null
    }
    return element
  });
  return database.splice(database.filter(element => element.id === id)[0], 1)
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
  tasks.map(element => {
    if (element.boardId === id) {
      tasks.splice(element, 1)
    }
    return element;
  })
  const board = boards.filter(element => element.id === id)[0];
  return boards.splice(board, 1)
}


const getAllTasks = async (boardId) => {
  const res = tasks.filter(element => element.id === boardId);
  return res === 0 ? [] : res
}
const createTask = async (task) => {
  tasks.push(task);
  return task;
}
const getTask = async id => tasks.filter(element => element.id === id)[0];
const updateTask = (id, updateBody) => {
  const task = tasks.filter(element => element.id === id)[0];
  task.title = updateBody.title;
  task.order = updateBody.order;
  task.description = updateBody.description;
  task.userId = updateBody.userId;
  task.columnId = updateBody.columnId;
  return task
};

const deleteTask = async id => {
  const task = tasks.filter(element => element.id === id)[0];
  return tasks.splice(task, 1)
}

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
