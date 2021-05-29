const database = require('../../common/database');

/**
  * Get all boards
  * @returns { Promise<Board[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAll = async () => database.getAllBoards();
/**
  * Create board
  * @params { CreatedBoardBody } (title, column) - information about new Board
  * Board's data writes in server's memory with push method
  * @returns { Promise<Board[]> } Returns response with board information
  */
const create = async board => database.createBoard(board);
/**
  * Getting board by id
  * @param { String } board's id
  * @returns { Promise<Board|undefined> } Returns response with board's information or undefined
  */
const get = async id => {
  const board = await database.getBoard(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};
/**
  * Update board's information
  * @param { String } board's id
  * @param { UpdatedBoardBody } changed board's body
  * @returns { Promise<Board|undefined> } Returns updated board or undefined
  */
const update = async (id, body) => {
  const board = await database.updateBoard(id, body);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};
/**
  * Delete board & boards's tasks
  * @param { String } board's id
  * @returns { Promise<Board[]> } Returns boards without deleted board and tasks without tasks of deleted board
  */
const deleteBoard = async id => {
  const board = await database.deleteBoard(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};

module.exports = { getAll, create, get, update, deleteBoard };
