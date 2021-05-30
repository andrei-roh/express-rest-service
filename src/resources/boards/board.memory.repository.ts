import {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
 } from '../../common/database';
 import { IBoardUpdatedBody } from './board.types';
/**
  * Get all boards
  * @returns { Promise<Board[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAll = async () => getAllBoards();
/**
  * Create board
  * @params { CreatedBoardBody } (title, column) - information about new Board
  * Board's data writes in server's memory with push method
  * @returns { Promise<Board[]> } Returns response with board information
  */
const create = async (board: IBoardUpdatedBody) => createBoard(board);
/**
  * Getting board by id
  * @param { String } board's id
  * @returns { Promise<Board|undefined> } Returns response with board's information or undefined
  */
const get = async (id: string) => {
  const board = await getBoard(id);
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
const update = async (id: string, body:IBoardUpdatedBody) => {
  const board = await updateBoard(id, body);
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
const delBoard = async (id: string) => {
  const board = await deleteBoard(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found!`);
  }
  return board
};

export { getAll, create, get, update, delBoard };
