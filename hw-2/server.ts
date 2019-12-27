import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator,
} from 'express-joi-validation';
import { User, userSchema } from './models/user';

import UsersStorage from './storage/users';

import express = require('express');
import bodyParser = require('body-parser');

interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: User;
}

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

const validator = createValidator();
const usersStorage = new UsersStorage();

app.get('/users', (req, res) => {
  res.json(usersStorage.getUsers());
});

app.get('/users/:id', (req, res) => {
  res.json(usersStorage.getUserById(req.params.id));
});

app.post(
  '/users', validator.body(userSchema),
  (req: ValidatedRequest<UserRequestSchema>, res) => {
    usersStorage.add(req.body);
    res.json('Created');
  },
);

app.put(
  '/users/:id', validator.body(userSchema),
  (req: ValidatedRequest<UserRequestSchema>, res) => {
    const user: User = {
      ...req.body,
      id: req.params.id,
    };
    usersStorage.update(user);
    res.json('Updated');
  },
);

app.delete('/users/:id', (req, res) => {
  usersStorage.remove(req.params.id);
  res.json('Softly deleted');
});

app.get('/getAutoSuggestUsers', (req, res) => {
  res.json(usersStorage.getUsers(
    req.query.login, Number(req.query.limit) || undefined,
  ));
});


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
