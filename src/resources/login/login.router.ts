import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as loginService from './login.service';
import { coverForFunction } from '../coverForFunction';
import { JWT_SECRET_KEY, JWT_TIME } from '../../common/config';

const router = express.Router({ mergeParams: true });

router.route('/').post(
  coverForFunction(async (req, res) => {
    const { login, password } = req.body;
    const user = await loginService.loginUser({ login, password });
    if (!user) {
      res.status(403).json();
    }
    const isPassValid = bcrypt.compareSync(password, user!.password);
    if (!isPassValid) {
      res.status(404).json();
    }
    const token = jwt.sign({ id: user!.id }, String(JWT_SECRET_KEY), { expiresIn: +JWT_TIME! });
    res.json({ token,
      user: {
        id: user!.id,
        login: user!.login
      }
    });
  })
);

export { router };
