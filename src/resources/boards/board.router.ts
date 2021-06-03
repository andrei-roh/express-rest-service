import express from 'express';
import { Board } from './board.model';
import { boardsService } from './board.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
  const boards = await boardsService.getAll();
  res.status(boards ? 200 : 404).json(boards);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  res.status(board ? 201 : 400).json(board);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(board ? 200 : 404).json(board);
  } catch(e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.status(board ? 200 : 404).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const tasks = await boardsService.delTasks(req.params.id);
  const board = await boardsService.delBoard(req.params.id);
  res.status(board && tasks ? 204 : 404).send('Board has been deleted');

});

export { router };
