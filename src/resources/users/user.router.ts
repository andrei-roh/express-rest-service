import express from 'express';
import { User } from './user.model';
import * as usersService from './user.service';
import { StatusCode, Messages } from '../../common/statusCodes';
import { coverForFunction } from '../coverForFunction';

const router = express.Router({ mergeParams: true });

router.route('/').get(
  coverForFunction(async (_req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(users ? StatusCode.OK : StatusCode.BAD_REQUEST).json(users.map(User.toResponse));
  })
);

router.route('/:userId').get(
  coverForFunction(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.getUser(userId!);
    if (!user) {
      res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
    } else {
      res.status(StatusCode.OK).json(User.toResponse(user));
    }
  })
);

router.route('/').post(
  coverForFunction(async (req, res) => {
    const user = await usersService.create(new User(req.body));
    res.status(user ? StatusCode.CREATED : StatusCode.BAD_REQUEST).json(User.toResponse(user));
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
    res.status(user ? StatusCode.DELETED : StatusCode.BAD_REQUEST).end()
  })
);

export { router };
