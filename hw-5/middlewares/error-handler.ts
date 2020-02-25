import {ErrorRequestHandler, NextFunction, Request, Response} from 'express';

export const errorHandler =
    (err: ErrorRequestHandler, req: Request, res: Response,
     next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }
      res.status(500);
      res.render('Unhadled Error:', {error: err});
    }