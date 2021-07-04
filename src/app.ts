import express, { Request, Response, NextFunction } from 'express';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter} from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { router as loginRouter } from './resources/login/login.router';
import { router as logger } from './middlewares/logging';
import { router as userValidation } from './middlewares/usersValidation';
import { errorHandler } from './middlewares/errorsHandling';
import { uncaughtExceptionsHandler, unhandledRejectionsHandler } from './middlewares/uncaughtHandling';

const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process.on('uncaughtException', (err) => {
  uncaughtExceptionsHandler(err);
});

process.on('unhandledRejection', (reason, promise) => {
  unhandledRejectionsHandler(reason, promise);
});

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', logger);
app.use('/login', loginRouter);
app.use(userValidation);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(errorHandler);

export default app;
