import fs from 'fs';

const uncaughtExceptionsHandler = (err: Error) => {
  const { name, message, stack } = err;
  const startTime = new Date();
  const oneConclusion = `
  uncaughtException:
  error name:       ${name}
  error message:    ${message}
  process time:     ${startTime}
  error stack:      ${stack}\n`;
  console.error(oneConclusion);
  fs.writeFileSync('./logs/uncaughtExceptionsLog.txt', oneConclusion);
  process.exit(1);
}

let listPointNumber = 1;

const unhandledRejectionsHandler = (
  reason: {} | null | undefined,
  promise: Promise<any>
) => {
  const startTime = new Date();
  const oneConclusion = `
  №                       ${listPointNumber}
  unhandled rejection at: ${JSON.stringify(promise)}
  time:                   ${startTime}
  reason:                 ${reason}\n`;
  listPointNumber += 1;
  console.warn(oneConclusion);
  fs.appendFileSync('./logs/unhandledRejectionsLog.txt', oneConclusion);
}

export { uncaughtExceptionsHandler, unhandledRejectionsHandler };
