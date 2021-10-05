import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Class-based Middleware working here');
    // console.log('req', req);
    console.log('res', res);
    next();
  }
}

export function functionalLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Functional Middleware working here');

  // console.log(response);

  next();
}
