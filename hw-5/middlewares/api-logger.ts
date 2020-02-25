import {NextFunction, Request, Response} from 'express';
import {logger} from './logger';

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  let logStr = `[${req.method}] ${req.url}\n Params: ${
      JSON.stringify(req.params)}\n Body: ${JSON.stringify(req.body)}`;

  logger.info(logStr);
  next();
};
