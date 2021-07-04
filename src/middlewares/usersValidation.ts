import express from 'express';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { coverForFunction } from '../resources/coverForFunction';
import { JWT_SECRET_KEY } from '../common/config';
import { ILoader } from '../resources/types';
import { get } from '../resources/users/user.repository';

const router = express.Router({ mergeParams: true });

router.use(
  coverForFunction(
    async (req, res, next) => {
      const sessionToken = req.headers.authorization?.split(' ')[1];
      if (!sessionToken) {
        res.status(401).json()
      }
      jwt.verify(sessionToken!, String(JWT_SECRET_KEY), async (err) => {
        if (err) {
          res.status(401).json()
        };
        const payload: ILoader = jwtDecode(sessionToken!);
        const { id } = payload;
        const user = await get(id);
        if (!user) {
          res.status(401).json()
        }
        next();
      });
    }
  )
);

export { router };
