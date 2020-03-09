import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {HTTP_ERROR, JWT_SECRET} from '../constants/http-errors.enum';

function isValidUser(username: string, password: string): boolean {
  return username === 'admin' && password === 'admin';
}

// eslint-disable-next-line import/prefer-default-export
export const login = ({body}: Request, res: Response): void => {
  const {username, password} = body;

  if (isValidUser(username, password)) {
    const payload = {user: 'admin'};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: 10});
    res.send(token);
  } else {
    res.status(HTTP_ERROR.BAD_CREDENTIALS)
        .send({success: false, message: 'Bad username/password combination.'});
  }
};
