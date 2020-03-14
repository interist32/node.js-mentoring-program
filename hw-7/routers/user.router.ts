import {createValidator,} from 'express-joi-validation';

import {UsersController} from '../controllers/users.controller';
import {optionalUserSchema, userSchema} from '../schemas/user.schema';

import express = require('express');
import UsersService from '../services/users.service';
import UserModelRepository from '../data-access/repositories/user.repository';

const router = express.Router();
const validator = createValidator();
const usersController =
    new UsersController(new UsersService(new UserModelRepository()));

export default router.get('/', (req, res) => usersController.getUsers(req, res))
    .get('/:id', (req, res) => usersController.getUser(req, res))
    .post(
        '/', validator.body(userSchema),
        (req, res) => usersController.addUser(req, res))
    .put(
        '/:id', validator.body(optionalUserSchema),
        (req, res) => usersController.updateUser(req, res))
    .delete('/:id', (req, res) => usersController.deleteUser(req, res));
