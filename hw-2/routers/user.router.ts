import {
  createValidator,
} from 'express-joi-validation';
import { userSchema, optionalUserSchema } from '@app-models/user';
import {
  getUsers, getUser, addUser, updateUser, deleteUser,
} from '../controllers/users.controller';

import express = require('express');

const router = express.Router();
const validator = createValidator();

export default router
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', validator.body(userSchema), addUser)
  .put('/:id', validator.body(optionalUserSchema), updateUser)
  .delete('/:id', deleteUser);
