import express from 'express';
import { Task } from './task.model';
import * as tasksService from './task.service';
import { StatusCode, Messages } from '../../common/statusCodes';
import { coverForFunction } from '../coverForFunction';

const router = express.Router({ mergeParams: true });

router.route('/').get(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId!);
    res.status(tasks ? StatusCode.OK : StatusCode.NOT_FOUND).json(tasks);
  })
);

router.route('/:taskId').get(
  coverForFunction(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.getTask(boardId!, taskId!);
    if (!task) {
      res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
    } else {
      res.status(StatusCode.OK).json(task);
    }
  })
);

router.route('/').post(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task(boardId!, req.body));
    res.status(task ? StatusCode.CREATED : StatusCode.BAD_REQUEST).json(task);
  })
);

router.route('/:taskId').put(
  coverForFunction(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.update(boardId!, taskId!, req.body);
    res.status(task ? StatusCode.OK : StatusCode.NOT_FOUND).json(task);
  })
);

router.route('/:taskId').delete(
  coverForFunction(async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.deleteTask(taskId!);
    res.status(task ? StatusCode.DELETED : StatusCode.NOT_FOUND).json();
  })
);

export { router };
