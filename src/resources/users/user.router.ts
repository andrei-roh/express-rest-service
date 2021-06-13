import express from 'express';
import { User } from './user.model';
import { usersService } from './user.service';
import { StatusCode, Messages } from '../../common/statusCodes';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (_req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(users ? StatusCode.OK : StatusCode.BAD_REQUEST).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
    res.status(user ? StatusCode.CREATED : StatusCode.BAD_REQUEST).json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(user ? StatusCode.OK : StatusCode.BAD_REQUEST).json(User.toResponse(user));
  } catch {
    res.status(StatusCode.NOT_FOUND).send(Messages.NOT_FOUND);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { name, login, password } = body;
  if (!name || !login || !password) {
    res.status(StatusCode.BAD_REQUEST).end()
  }
  const user = await usersService.update(id, body);
  if(user) {
    res.status(StatusCode.OK).json(User.toResponse(user))
  }
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.delUser(req.params.id);
  const tasks = await usersService.delTasks(req.params.id);
  res.status(user && tasks ? StatusCode.DELETED : StatusCode.BAD_REQUEST).end()
});

export { router };
