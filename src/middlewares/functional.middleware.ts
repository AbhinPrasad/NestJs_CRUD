import { Request, Response, NextFunction } from 'express';

export function FunctionalLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request...`);
  next();
}
