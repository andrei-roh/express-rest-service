import express, { Request } from 'express';
import { Task } from './task.model';
import { tasksService } from './task.service';

interface IRequestParams {
  id: string;
  taskId: string;
  boardId: string;
}

const router = express.Router({ mergeParams: true });

router.route('/').get(async (_req, res) => {
  const tasks = await tasksService.getAll();
  res.status(tasks ? 200 : 404).json(tasks);
});

router.route('/').post(async (req: Request<IRequestParams>, res) => {
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

router.route('/:taskId').get(async (req: Request<IRequestParams>, res) => {
  try {
    const task = await tasksService.get(req.params.taskId, req.params.boardId);
    res.status(task ? 200 : 404).json(task);
  } catch(e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req: Request<IRequestParams>, res) => {
  const { id, boardId } = req.params;
  const { body } = req;
  const { title, description } = body;
  if (!title || !description) {
    res.status(404).send('Could not find task');
  }
  const task = tasksService.update(id, boardId, body);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).end();
  }
});

router.route('/:id').delete(async (req: Request<IRequestParams>, res) => {
  try {
    await tasksService.del(req.params.id, req.params.boardId);
    res.status(204).send('Task has been deleted');
  } catch (e) {
    res.status(404).send('Could not find task');
  }
  res.status(tasksService.del(req.params.id, req.params.boardId) ? 204 : 404).end()
});

export { router };
