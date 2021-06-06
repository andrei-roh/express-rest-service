import express from 'express';
import { User } from './user.model';
import { usersService } from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(users ? 200 : 400).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
    res.status(user ? 201 : 400).json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(user ? 200 : 400).json(User.toResponse(user));
  } catch(e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { name, login, password } = body;
  if (!name || !login || !password) {
    res.status(400).end()
  }
  const user = await usersService.update(id, body);
  if(user) {
    res.status(200).json(User.toResponse(user))
  }
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.delUser(req.params.id);
  const tasks = await usersService.delTasks(req.params.id);
  res.status(user && tasks ? 204 : 400).end()
});

export { router };
