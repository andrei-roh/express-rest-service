import express from 'express';
import { finished } from 'stream';
import fs from 'fs';

const router = express.Router({ mergeParams: true });

let listPointNumber = 1;
const writeStream = fs.createWriteStream('./logs/log.txt');

router.use((req, res, next) => {
  const startTime = new Date();
  const url = `http://localhost:4000${req.baseUrl + req.url}`;
  const requestBody = JSON.stringify(req.body);
  const requestParameters = JSON.stringify(req.query);

  next();

  finished(res, () => {
    const { statusCode } = res;
    const getCurrentTime = Date.now() - (+startTime);
    const oneConclusion = `
    №                          ${listPointNumber}
    url:                       ${url}
    body:                      ${requestBody}
    query parameters:          ${requestParameters}
    process time:              ${getCurrentTime} ms
    response status code:      ${statusCode}\n`;
    listPointNumber += 1;
    console.log(oneConclusion);
    writeStream.write(oneConclusion);
  });
});

export { router };
