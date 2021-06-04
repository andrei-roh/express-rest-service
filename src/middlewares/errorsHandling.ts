import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

let listPointNumber = 1;
const writeErrorStream = fs.createWriteStream('./errorsLog.txt');

function errorHandler (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { statusCode } = res;
  const { name, message, stack } = err;

  res.status(statusCode).json({ statusCode, message });

  const oneConclusion = `
  №                       ${listPointNumber}
  error name:             ${name}
  error message:          ${message}
  error stack:            ${stack}
  response status code:   ${statusCode}\n`;
  listPointNumber += 1;
  console.error(oneConclusion);
  writeErrorStream.write(oneConclusion);

  next();
}

export { errorHandler };
