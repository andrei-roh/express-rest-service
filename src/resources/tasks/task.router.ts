import express from 'express';
import { Task } from './task.model';
import { tasksService } from './task.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(tasks ? 200 : 400).json(tasks);
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
  res.status(task ? 201 : 400).json(task);
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.taskId, req.params.boardId);
    res.status(task ? 200 : 400).json(task);
  } catch(e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.status(task ? 200 : 400).json(task);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.del(req.params.id, req.params.boardId);
    res.status(204).send('Task has been deleted');
  } catch (e) {
    res.status(404).send('Could not find task');
  }
  res.status(await tasksService.del(req.params.id, req.params.boardId) ? 204 : 404).end()
});

export { router };
