const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
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
  const user = await usersService.update(req.params.id, req.body);
  res.status(user ? 200 : 400).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  res.status(user ? 204 : 400).end()
});

module.exports = router;
