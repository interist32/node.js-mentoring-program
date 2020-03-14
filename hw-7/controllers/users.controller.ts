import {User} from '@app-models/user.interface';
import {Request, Response} from 'express';
import {ValidatedRequest} from 'express-joi-validation';

import {HTTP_ERROR} from '../constants/http-errors.enum';
import {UserRequestSchema} from '../schemas/user.schema';
import UsersService from '../services/users.service';


export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getUsers({query}: Request, res: Response): void {
    const {login, limitQueryString} = query;
    const limit = +limitQueryString || undefined;

    this.usersService.getUsers(login, limit).then((users) => {
      res.json(users);
    });
  };

  getUser({params}: Request, res: Response): void {
    const {id} = params;
    this.usersService.getUserById(id).then((user) => res.json(user));
  };

  addUser({body}: ValidatedRequest<UserRequestSchema>, res: Response): void {
    this.usersService.add(body)
        .then((user: User) => res.json(user))
        .catch((error: Error) => {
          res.status(HTTP_ERROR.INTERNAL_SERVER_ERROR);
          res.json({
            error: error.message,
          });
        });
  };

  updateUser(
      {body, params}: ValidatedRequest<UserRequestSchema>,
      res: Response): void {
    const {id} = params;
    const user: User = {
      ...body,
      id,
    };

    this.usersService.update(user).then((u) => res.json(u));
  };

  deleteUser({params}: ValidatedRequest<UserRequestSchema>, res: Response):
      void {
    const {id} = params;
    this.usersService.remove(id).then((user) => res.json(user));
  };
}
