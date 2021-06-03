import {
  getAll as getAllBoards,
  create as createBoard,
  get as getBoardById,
  update as updateBoard,
  delBoard as deleteBoard,
  delTasks as deleteBoardTasks,
} from './board.memory.repository';
import { IBoardUpdatedBody } from './board.types';
/**
  * Get all boards
  * @returns { Promise<Board[]> } Returns response takes a copy of information and saves in new memory part
  */
const getAll = () => getAllBoards();
/**
  * Create board
  * @params { CreatedBoardBody } (title, column) - information about new Board
  * Board's data writes in server's memory with push method
  * @returns { Promise<Board[]> } Returns response with board information
  */
const create = (board: IBoardUpdatedBody) => createBoard(board);
/**
  * Getting board by id
  * @param { String } board's id
  * @returns { Promise<Board|undefined> } Returns response with board's information or undefined
  */
const get = (id: string) => getBoardById(id);
/**
  * Update board's information
  * @param { String } board's id
  * @param { UpdatedBoardBody } changed board's body
  * @returns { Promise<Board|undefined> } Returns updated board or undefined
  */
const update = (id: string, body: IBoardUpdatedBody) => updateBoard(id, body);
/**
  * Delete board & boards's tasks
  * @param { String } board's id
  * @returns { Promise<Board[]> } Returns boards without deleted board and tasks without tasks of deleted board
  */
const delBoard = (id: string) => deleteBoard(id);

const delTasks = (id: string) => deleteBoardTasks(id);

export const boardsService = { getAll, create, get, update, delBoard, delTasks };
