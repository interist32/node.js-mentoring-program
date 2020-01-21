import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestSchema, User } from '@app-models/user';
import UsersService from '../services/users';

const usersService = new UsersService();

function prepareUser(user: User | null): User | null {
  if (user === null) return null;

  const { isDeleted: _, ...preparedUser } = user;
  console.log(_);

  return preparedUser;
}

export const getUsers = ({ query }: Request, res: Response): void => {
  const { login, limitQueryString } = query;
  const limit = +limitQueryString || undefined;
  const users = usersService.getUsers(login, limit).map(prepareUser);
  res.json(users);
};

export const getUser = (req: Request, res: Response): void => {
  const user = usersService.getUserById(req.params.id);
  const preparedUser = prepareUser(user);
  res.json(preparedUser);
};

export const addUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  res.json(prepareUser(usersService.add(req.body)));
};

export const updateUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  const user: User = {
    ...req.body,
    id: req.params.id,
  };
  res.json(prepareUser(usersService.update(user)));
};

export const deleteUser = (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
): void => {
  res.json(prepareUser(usersService.remove(req.params.id)));
};
