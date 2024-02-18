import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { timestamp } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const contexto = host.switchToHttp();
    const response = contexto.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionRespose = exception.getResponse();

    const error =
      typeof response === 'string'
        ? { message: exceptionRespose }
        : (exceptionRespose as object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
