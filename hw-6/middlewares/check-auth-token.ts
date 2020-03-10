import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { HTTP_ERROR, JWT_SECRET } from '../constants/http-errors.enum';

export const checkAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token'] as string | undefined;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) {
        res.status(HTTP_ERROR.UNAUTHORIZED).json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      } else {
        next();
      }
    });
  } else {
    res.status(HTTP_ERROR.UNAUTHORIZED)
      .send({ success: false, message: 'No token provided.' });
  }
};

export default checkAuthToken;
