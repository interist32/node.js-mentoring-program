import { Request, Response } from 'express';

import Group from '@app-models/group';
import HTTP_ERROR from '../constants/http-errors.enum';
import GroupRepository from '../data-access/group.repository';
import GroupService from '../services/groups.service';

const groupService = new GroupService(new GroupRepository());

export const getGroups = (req: Request, res: Response): void => {
  groupService.getGroups().then((groups) => res.json(groups));
};

export const getGroup = ({ params }: Request, res: Response): void => {
  const { id } = params;
  groupService.getGroupById(id).then((group) => res.json(group));
};

export const addGroup = ({ body }: Request, res: Response): void => {
  const { name, permissions } = body;

  const group = {
    name,
    permissions,
  } as Group;

  groupService.add(group)
    .then((g) => res.json(g))
    .catch((error: Error) => {
      res.status(HTTP_ERROR.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });
};

export const updateGroup = ({ body, params }: Request, res: Response): void => {
  const { id } = params;
  const { name, permissions } = body;

  const group = {
    name,
    permissions,
    id,
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
