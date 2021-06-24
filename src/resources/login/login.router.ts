import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import * as loginService from './login.service';
import { coverForFunction } from '../coverForFunction';
import { JWT_SECRET_KEY } from '../../common/config';

const router = express.Router({ mergeParams: true });

router.route('/login').post(
  coverForFunction(async (req, res) => {
    const { login, password } = req.body;
    const user = await loginService.loginUser(login);
    if (user) {
      // const isPassValid = bcrypt.compareSync(password, user.password);
      // if (!isPassValid) {
      //   res.status(404).json();
      // }
      if (JWT_SECRET_KEY) {
        const token = jwt.sign({ id: user.id }, config.get(JWT_SECRET_KEY), { expiresIn: "1h" });
        res.json({ token,
          user: {
            id: user.id,
            login: user.login
          }
        });
      }
    }
    res.status(403).json();
  })
);

export { router };
