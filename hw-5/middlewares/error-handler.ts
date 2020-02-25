import {NextFunction, Request, Response} from 'express';

export const errorHandler =
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }
      res.status(500);
      res.json({error: err});
    }