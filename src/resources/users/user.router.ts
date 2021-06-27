import express from 'express';
import { User } from './user.model';
import * as usersService from './user.service';
import { coverForFunction } from '../coverForFunction';

const router = express.Router({ mergeParams: true });

router.route('/').get(
  coverForFunction(async (_req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(users ? 200 : 400).json(users.map(User.toResponse));
  })
);

router.route('/:userId').get(
  coverForFunction(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.getUser(userId!);
    if (!user) {
      res.status(404).json();
    } else {
      res.status(200).json(User.toResponse(user));
    }
  })
);

router.route('/').post(
  coverForFunction(async (req, res) => {
    const user = await usersService.create(new User(req.body));
    res.status(user ? 201 : 400).json(User.toResponse(user));
  })
);

router.route('/:userId').put(
  coverForFunction(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.update(userId!, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:userId').delete(
  coverForFunction(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.deleteUser(userId!);
    res.status(user ? 204 : 400).end()
  })
);

export { router };
