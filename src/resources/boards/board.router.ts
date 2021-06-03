import express from 'express';
import { Board } from './board.model';
import { boardsService } from './board.service';
import { StatusCode, Messages } from '../../common/statusCodes';

const router = express.Router();

router.route('/').get(async (_req, res) => {
  const boards = await boardsService.getAll();
  res.status(boards ? StatusCode.OK : StatusCode.NOT_FOUND).json(boards);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  res.status(board ? StatusCode.CREATED : StatusCode.BAD_REQUEST).json(board);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(board ? StatusCode.OK : StatusCode.NOT_FOUND).json(board);
  } catch {
    res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.status(board ? StatusCode.OK : StatusCode.NOT_FOUND).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const tasks = await boardsService.delTasks(req.params.id);
  const board = await boardsService.delBoard(req.params.id);
  res.status(board && tasks ? StatusCode.OK : StatusCode.NOT_FOUND).send(Messages.BOARD_DEL);

});

export { router };
