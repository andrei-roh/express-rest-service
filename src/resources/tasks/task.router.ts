import express, { Request } from 'express';
import { Task } from './task.model';
import { tasksService } from './task.service';
import { StatusCode, Messages } from '../../common/statusCodes';

interface IRequestParams {
  id: string;
  taskId: string;
  boardId: string;
}

const router = express.Router({ mergeParams: true });

router.route('/').get(async (_req, res) => {
  const tasks = await tasksService.getAll();
  res.status(tasks ? StatusCode.OK : StatusCode.NOT_FOUND).json(tasks);
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
  res.status(task ? StatusCode.CREATED : StatusCode.BAD_REQUEST).json(task);
});

router.route('/:taskId').get(async (req: Request<IRequestParams>, res) => {
  try {
    const task = await tasksService.get(req.params.taskId, req.params.boardId);
    res.status(task ? StatusCode.OK : StatusCode.NOT_FOUND).json(task);
  } catch {
    res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
  }
});

router.route('/:id').put(async (req: Request<IRequestParams>, res) => {
  const { id, boardId } = req.params;
  const { body } = req;
  const { title, description } = body;
  if (!title || !description) {
    res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
  }
  const task = tasksService.update(id, boardId, body);
  if (task) {
    res.status(StatusCode.OK).json(task);
  } else {
    res.status(StatusCode.NOT_FOUND).end();
  }
});

router.route('/:id').delete(async (req: Request<IRequestParams>, res) => {
  try {
    await tasksService.del(req.params.id, req.params.boardId);
    res.status(StatusCode.DELETED).send(Messages.TASK_DEL);
  } catch (e) {
    res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
  }
  res.status(tasksService.del(req.params.id, req.params.boardId)
    ? StatusCode.DELETED 
    : StatusCode.NOT_FOUND).end()
});

export { router };
