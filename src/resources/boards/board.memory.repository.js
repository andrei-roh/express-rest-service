const database = require('../../common/database');

const getAll = async () => database.getAllBoards();
const get = async (id) => {
  const board = await database.getBoard(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};
const create = async board => database.createBoard(board);
const update = async (id, body) => database.updateBoard(id, body);
const deleteBoard = async id => database.deleteBoard(id);

module.exports = { getAll, create, get, update, deleteBoard };
