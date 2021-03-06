import {NextFunction, Request, Response} from 'express';

import {HTTP_ERROR} from '../constants/http-errors.enum';
import logger from './logger';

export const errorHandler =
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      if (res.headersSent) {
        return next(err);
      }
      logger.error(err);
      res.status(HTTP_ERROR.INTERNAL_SERVER_ERROR);
      res.json({error: err});
      return undefined;
    };

export default errorHandler;
