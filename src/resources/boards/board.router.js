const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch(e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.deleteBoard(req.params.id);
  res.status(204).end()
});

module.exports = router;
