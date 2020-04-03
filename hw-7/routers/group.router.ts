import {GroupsController,} from '../controllers/groups.controller';

import express = require('express');
import GroupModelRepository from '../data-access/repositories/group.repository';
import GroupService from '../services/groups.service';

const router = express.Router();
const groupsController =
    new GroupsController(new GroupService(new GroupModelRepository()));

export default router
    .get('/', (req, res) => groupsController.getGroups(req, res))
    .get('/:id', (req, res) => groupsController.getGroup(req, res))
    .post('/', (req, res) => groupsController.addGroup(req, res))
    .put('/:id', (req, res) => groupsController.updateGroup(req, res))
    .delete('/:id', (req, res) => groupsController.deleteGroup(req, res))
    .post(
        '/addUsersToGroup',
        (req, res) => groupsController.addUsersToGroup(req, res));
