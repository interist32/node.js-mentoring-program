import { Request, Response } from 'express';

import Group from '@app-models/group';
import GroupRepository from '../data-access/group.repository';
import GroupService from '../services/groups.service';

const groupService = new GroupService(new GroupRepository());

export const getGroups = (req: Request, res: Response): void => {
  groupService.getGroups().then((groups) => res.json(groups));
};

export const getGroup = (req: Request, res: Response): void => {
  groupService.getGroupById(req.params.id).then((group) => res.json(group));
};

export const addGroup = ({ body }: Request, res: Response): void => {
  const { name, permissions } = body;
  groupService.add({
    name,
    permissions,
  } as Group)
    .then((group: Group) => res.json(group))
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
};

export const updateGroup = (req: Request, res: Response): void => {
  const { name, permissions } = req.body;

  const group = {
    name,
    permissions,
    id: req.params.id,
  } as Group;

  groupService.update(group).then((g) => res.json(g));
};

export const deleteGroup = (
  { params }: Request,
  res: Response,
): void => {
  groupService.remove(params.id).then((group) => res.json(group));
};

export const addUsersToGroup = ({ body }: Request, res: Response): void => {
  const { userIds, groupId } = body;
  groupService.addUsersToGroup(groupId, userIds).then((updatedCount) => res.json(updatedCount));
};
