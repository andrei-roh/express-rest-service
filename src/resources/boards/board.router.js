const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(boards ? 200 : 400).json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  res.status(board ? 201 : 400).json(Board.toResponse(board));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(board ? 200 : 400).json(Board.toResponse(board));
  } catch(e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.status(board ? 200 : 404).json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.deleteBoard(req.params.id);
    res.status(204).send('Board has been deleted');
  } catch (e) {
    res.status(404).send('Could not find board');
  }
  res.status(await boardsService.deleteBoard(req.params.id) ? 204 : 404).end()
});

module.exports = router;
