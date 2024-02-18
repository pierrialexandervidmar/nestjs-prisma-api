import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { NotFoundError } from '../types/NotFoundError';

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotFoundError) {
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
