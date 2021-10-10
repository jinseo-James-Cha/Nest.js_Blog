import { NextFunction } from 'express';

export function functionalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Functional Middleware working here');
  next();
}
