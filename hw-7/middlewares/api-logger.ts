import { NextFunction, Request, Response } from 'express';
import logger from './logger';

export const apiLogger = (req: Request, res: Response, next: NextFunction): void => {
  const log = `${req.method} ${req.url} Params: ${JSON.stringify(req.params)}`;

  logger.info(log);
  next();
};

export default apiLogger;
