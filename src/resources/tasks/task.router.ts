import express, { Request } from 'express';
import { Task } from './task.model';
import * as tasksService from './task.service';
import { StatusCode, Messages } from '../../common/statusCodes';

interface IRequestParams {
  id: string;
  taskId: string;
  boardId: string;
}

const router = express.Router({ mergeParams: true });

router.route('/').get(async (req: Request<IRequestParams>, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.status(tasks ? StatusCode.OK : StatusCode.NOT_FOUND).json(tasks);
});

router.route('/:taskId').get(async (req: Request<IRequestParams>, res) => {
  try {
    const task = await tasksService.getTask(req.params.taskId, req.params.boardId);
    if (!task) {
      res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
    }
    res.status(StatusCode.OK).json(task);
  } catch {
    res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
  }
});

router.route('/').post(async (req: Request<IRequestParams>, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(new Task(boardId!, req.body));
  res.status(task ? StatusCode.CREATED : StatusCode.BAD_REQUEST).json(task);
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
    await tasksService.deleteTask(req.params.id);
    res.status(StatusCode.DELETED).send(Messages.TASK_DEL);
  } catch (e) {
    res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
  }
  res.status(tasksService.deleteTask(req.params.id)
    ? StatusCode.DELETED
    : StatusCode.NOT_FOUND).end()
});

export { router };
