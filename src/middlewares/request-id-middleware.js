import { randomUUID } from 'node:crypto';

export const requestIdMiddleware = (req, res, next) => {
  req.id = randomUUID();
  next();
};
