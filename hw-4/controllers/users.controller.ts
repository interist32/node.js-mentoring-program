import { User, UserRequestSchema } from '@app-models/user';
import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import UserRepository from '../data-access/user.repository';
import UsersService from '../services/users.service';
import HTTP_ERROR from '../constants/http-errors.enum';

const usersService = new UsersService(new UserRepository());

export const getUsers = ({ query }: Request, res: Response): void => {
  const { login, limitQueryString } = query;
  const limit = +limitQueryString || undefined;

  usersService.getUsers(login, limit).then((users) => {
    res.json(users);
  });
};

export const getUser = ({ params }: Request, res: Response): void => {
  const { id } = params;
  usersService.getUserById(id).then((user) => res.json(user));
};

export const addUser = ({ body }: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  usersService.add(body)
    .then((user: User) => res.json(user))
    .catch((error: Error) => {
      res.status(HTTP_ERROR.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });
};

export const updateUser = ({ body, params }: ValidatedRequest<UserRequestSchema>,
  res: Response): void => {
  const { id } = params;
  const user = new User({
    ...body,
    id,
  });

  usersService.update(user).then((u) => res.json(u));
};

export const deleteUser = (
  { params }: ValidatedRequest<UserRequestSchema>,
  res: Response,
): void => {
  const { id } = params;
  usersService.remove(id).then((user) => res.json(user));
};
