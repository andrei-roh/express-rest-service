const User = require('../resources/users/user.model');
<<<<<<< Updated upstream

const database = [];

database.push(new User(), new User(), new User())
=======
const Board = require('../resources/boards/board.model');

const database = [];
const boards = [];

database.push(new User(), new User(), new User());
boards.push(new Board(), new Board());
>>>>>>> Stashed changes

const getAllUsers = async () => {
  const res = JSON.parse(JSON.stringify(database));
  return res
<<<<<<< Updated upstream
  // return database.slice(0)
}

const getUser = async id => database.filter(element => element.id === id)[0];

=======
}
const getUser = async id => database.filter(element => element.id === id)[0];
>>>>>>> Stashed changes
const createUser = async user => {
  database.push(user);
  return user
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const updateUser = async (id, updateBody) => {
  const user = database.filter(element => element.id === id)[0];
  user.name = updateBody.name;
  user.login = updateBody.login;
  user.password = updateBody.password;
  return user
};
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const deleteUser = async (id) => {
  const user = database.filter(element => element.id === id)[0];
  return database.splice(user, 1)
}

<<<<<<< Updated upstream
module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
=======
const getAllBoards = async () => {
  const res = JSON.parse(JSON.stringify(boards));
  return res
}
const getBoard = async id => boards.filter(element => element.id === id)[0];


module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoard
};
>>>>>>> Stashed changes
