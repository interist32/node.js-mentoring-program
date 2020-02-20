import {
  getGroups, getGroup, addGroup, updateGroup, deleteGroup, addUsersToGroup,
} from '../controllers/groups.controller';

import express = require('express');

const router = express.Router();

export default router
  .get('/', getGroups)
  .get('/:id', getGroup)
  .post('/', addGroup)
  .put('/:id', updateGroup)
  .delete('/:id', deleteGroup)
  .post('/addUsersToGroup', addUsersToGroup);
