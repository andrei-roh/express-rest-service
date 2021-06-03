const database = require('../../common/database');

const getAll = async () => database.getAllBoards();

const create = async board => database.createBoard(board);

const get = async id => {
  const board = await database.getBoard(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};

const update = async (id, body) => {
  const board = await database.updateBoard(id, body);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};

const deleteBoard = async id => {
  const board = await database.deleteBoard(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};

module.exports = { getAll, create, get, update, deleteBoard };
