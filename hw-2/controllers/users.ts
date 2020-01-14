import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import UsersStorage from '../storage/users';
import { UserRequestSchema, User } from '../models/user';

const usersStorage = new UsersStorage();

function prepareUser(user: User | null): User | null {
  if (user === null) return null;

  const { isDeleted: _, ...preparedUser } = user;
  console.log(_);

  return preparedUser;
}

export const getUsers = ({ query }: Request, res: Response): void => {
  const { login, limitQueryString } = query;
  const limit = +limitQueryString || undefined;
  const users = usersStorage.getUsers(login, limit).map(prepareUser);
  res.json(users);
};

export const getUser = (req: Request, res: Response): void => {
  const user = usersStorage.getUserById(req.params.id);
  const preparedUser = prepareUser(user);
  res.json(preparedUser);
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
