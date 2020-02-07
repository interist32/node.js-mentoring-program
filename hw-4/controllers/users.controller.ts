import { User, UserRequestSchema } from '@app-models/user';
import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import GroupRepository from '../data-access/group.repository';
import UserRepository from '../data-access/user.repository';
import GroupService from '../services/groups.service';
import UsersService from '../services/users.service';

const usersService = new UsersService(new UserRepository());
const groupService = new GroupService(new GroupRepository());

export const getUsers = ({ query }: Request, res: Response): void => {
  const { login, limitQueryString } = query;
  const limit = +limitQueryString || undefined;

  usersService.getUsers(login, limit).then((users) => {
    res.json(users);
  });
};

export const getUser = (req: Request, res: Response): void => {
  usersService.getUserById(req.params.id).then((user) => res.json(user));
};

export const addUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  usersService.add(req.body)
    .then((user: User) => res.json(user))
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
};

export const updateUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  const user = new User({
    ...req.body,
    id: req.params.id,
  });

  usersService.update(user).then((u) => res.json(u));
};

export const deleteUser = (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
): void => {
  usersService.remove(req.params.id).then((user) => res.json(user));
};
