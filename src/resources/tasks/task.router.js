const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(tasks ? 200 : 400).json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: null
    })
  );
  res.status(task ? 201 : 400).json(Task.toResponse(task));
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.taskId);
    res.status(task ? 200 : 400).json(Task.toResponse(task));
  } catch(e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.status(task ? 200 : 400).json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.deleteTask(req.params.id);
    res.status(204).send('Task has been deleted');
  } catch (e) {
    res.status(404).send('Could not find task');
  }
  res.status(await tasksService.deleteTask(req.params.id) ? 204 : 404).end()
});

module.exports = router;
