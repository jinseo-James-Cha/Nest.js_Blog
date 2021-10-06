import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        Object.keys(value).forEach((key) => {
          if (value[`${key}`] === null) {
            value[`${key}`] = '';
            console.log(value[`${key}`]);
          }
          console.log(key);
          console.log(value[`${key}`]);
        });
        return value;
      }),
    );
  }
}
