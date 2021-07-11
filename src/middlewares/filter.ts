import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  Injectable,
} from '@nestjs/common';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

@Catch()
@Injectable()
export class Filter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = exception instanceof HttpException
      ? exception.getStatus()
      : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException
      ? exception.message
      : getReasonPhrase(statusCode);
    const { name, stack } = exception;

    this.logger.error({ statusCode, name, message, stack });
    response.status(statusCode).json({ statusCode, message });
  };
};
