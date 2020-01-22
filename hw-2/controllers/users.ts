import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestSchema, User } from '@app-models/user';

import UsersService from '../services/users';
import UsersRepository from '../data-access/usersRepository';

const usersService = new UsersService(new UsersRepository());

export const getUsers = ({ query }: Request, res: Response): void => {
  const { login, limitQueryString } = query;
  const limit = +limitQueryString || undefined;

  usersService.getUsers(login, limit).then((users) => {
    res.json(users.map((user) => user.toJSON()));
  });
};

export const getUser = (req: Request, res: Response): void => {
  usersService.getUserById(req.params.id).then((user) => res.json(user.toJSON()));
};

export const addUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  usersService.add(req.body)
    .then((user: User) => res.json(user.toJSON()))
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
};

export const updateUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  const user = new User({
    ...req.body,
    id: req.params.id,
  });

  usersService.update(user).then((u) => res.json(u.toJSON()));
};

export const deleteUser = (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
): void => {
  usersService.remove(req.params.id).then((user) => res.json(user.toJSON()));
};
