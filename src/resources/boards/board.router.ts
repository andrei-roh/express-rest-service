import express from 'express';
import { Board } from './board.model';
import * as boardsService from './board.service';
import { coverForFunction } from '../coverForFunction';

const router = express.Router({ mergeParams: true });

router.route('/').get(
  coverForFunction(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.status(boards ? 200 : 404).json(boards);
  })
);

router.route('/:boardId').get(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getBoard(boardId!);
    if (!board) {
      res.status(404).json();
    } else {
      res.status(200).json(board);
    }
  })
);

router.route('/').post(
  coverForFunction(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.status(board ? 201 : 400).json(board);
  })
);

router.route('/:boardId').put(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId!, req.body);
    res.status(board ? 200 : 404).json(board);
  })
);

router.route('/:boardId').delete(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.deleteBoard(boardId!);
    res.status(board ? 200 : 404).json();
  })
);

export { router };
