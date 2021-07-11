import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';

@Injectable()
export class Logging implements NestMiddleware {
  constructor(private logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const receiptTime = new Date().toLocaleString();
    const { method, body, query } = req;
    const url = `http://localhost:4000${req.baseUrl + req.url}`;

    next();

    finished(res, () => {
      const { statusCode } = res;
      this.logger.log({ method, url, body, query, statusCode, receiptTime });
    });
  }
}
