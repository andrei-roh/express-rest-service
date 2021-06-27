import express from 'express';
import { Task } from './task.model';
import * as tasksService from './task.service';
import { coverForFunction } from '../coverForFunction';

const router = express.Router({ mergeParams: true });

router.route('/').get(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId!);
    res.status(tasks ? 200 : 404).json(tasks);
  })
);

router.route('/:taskId').get(
  coverForFunction(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.getTask(boardId!, taskId!);
    if (!task) {
      res.status(404).json();
    } else {
      res.status(200).json(task);
    }
  })
);

router.route('/').post(
  coverForFunction(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task(boardId!, req.body));
    res.status(task ? 201: 203).json(task);
  })
);

router.route('/:taskId').put(
  coverForFunction(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.update(boardId!, taskId!, req.body);
    res.status(task ? 200 : 404).json(task);
  })
);

router.route('/:taskId').delete(
  coverForFunction(async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.deleteTask(taskId!);
    res.status(task ? 204 : 404).json();
  })
);

export { router };
