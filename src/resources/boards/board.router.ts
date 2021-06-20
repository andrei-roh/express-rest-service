import express from 'express';
import { Board } from './board.model';
import * as boardsService from './board.service';
import { StatusCode, Messages } from '../../common/statusCodes';
import { coverForFunction } from '../coverForFunction';

const router = express.Router({ mergeParams: true });

router.route('/').get(
  coverForFunction(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.status(boards ? StatusCode.OK : StatusCode.NOT_FOUND).json(boards);
  })
);

router.route('/:boardId').get(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getBoard(boardId!);
    if (!board) {
      res.status(StatusCode.NOT_FOUND).json();
    } else {
      res.status(StatusCode.OK).json(board);
    }
  })
);

router.route('/').post(
  coverForFunction(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.status(board ? StatusCode.CREATED : StatusCode.BAD_REQUEST).json(board);
  })
);

router.route('/:boardId').put(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId!, req.body);
    res.status(board ? StatusCode.OK : StatusCode.NOT_FOUND).json(board);
  })
);

router.route('/:boardId').delete(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.deleteBoard(boardId!);
    res.status(board ? StatusCode.OK : StatusCode.NOT_FOUND).send(Messages.BOARD_DEL);
  })
);

export { router };
