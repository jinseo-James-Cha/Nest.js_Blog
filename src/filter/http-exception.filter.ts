import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { TimeoutError } from 'rxjs';

// @Catch(HttpException)
@Catch(TimeoutError)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
  }
}
