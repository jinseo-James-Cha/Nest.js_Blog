import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { winstonLogger } from './logger/winston.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        // console.log(`logging interceptor +${Date.now() - start}ms`);
        winstonLogger.info(`logging interceptor +${Date.now() - start}ms`);
      }),
    );
  }
}
