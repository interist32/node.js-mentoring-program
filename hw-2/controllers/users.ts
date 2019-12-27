import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import UsersStorage from '../storage/users';
import { UserRequestSchema, User } from '../models/user';

const usersStorage = new UsersStorage();

function prepareUser(user: User | null): User | null {
  if (user === null) return null;

  const preparedUser = {
    ...user,
  };
  delete preparedUser.isDeleted;

  return preparedUser;
}

export const getUsers = (req: Request, res: Response): void => {
  const users = usersStorage.getUsers(
    req.query.login, Number(req.query.limit) || undefined,
  ).map((user) => prepareUser(user));
  res.json(users);
};

export const getUser = (req: Request, res: Response): void => {
  res.json(prepareUser(usersStorage.getUserById(req.params.id)));
};

export const addUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  res.json(prepareUser(usersStorage.add(req.body)));
};

export const updateUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
  const user: User = {
    ...req.body,
    id: req.params.id,
  };
  res.json(prepareUser(usersStorage.update(user)));
};

export const deleteUser = (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
): void => {
  res.json(prepareUser(usersStorage.remove(req.params.id)));
};
