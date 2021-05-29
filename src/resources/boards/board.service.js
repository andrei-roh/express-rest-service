const boardsRepo = require('./board.memory.repository');

/**
  * Get all boards
  * @returns { Promise<Board[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAll = () => boardsRepo.getAll();
/**
  * Create board
  * @params { CreatedBoardBody } (title, column) - information about new Board
  * Board's data writes in server's memory with push method
  * @returns { Promise<Board[]> } Returns response with board information
  */
const create = board => boardsRepo.create(board);
/**
  * Getting board by id
  * @param { String } board's id
  * @returns { Promise<Board|undefined> } Returns response with board's information or undefined
  */
const get = id => boardsRepo.get(id);
/**
  * Update board's information
  * @param { String } board's id
  * @param { UpdatedBoardBody } changed board's body
  * @returns { Promise<Board|undefined> } Returns updated board or undefined
  */
const update = (id, body) => boardsRepo.update(id, body);
/**
  * Delete board & boards's tasks
  * @param { String } board's id
  * @returns { Promise<Board[]> } Returns boards without deleted board and tasks without tasks of deleted board
  */
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, create, get, update, deleteBoard };
