import {Group} from '@app-models/group.inteface';
import {Request, Response} from 'express';

import {HTTP_ERROR} from '../constants/http-errors.enum';
import GroupsService from '../services/groups.service';

export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  getGroups(req: Request, res: Response): void {
    this.groupsService.getGroups().then((groups) => res.json(groups));
  }

  getGroup({params}: Request, res: Response): void {
    const {id} = params;
    this.groupsService.getGroupById(id).then((group) => res.json(group));
  }

  addGroup({body}: Request, res: Response): void {
    const {name, permissions} = body;

    const group = {
      name,
      permissions,
    } as Group;

    this.groupsService.add(group)
        .then((g) => res.json(g))
        .catch((error: Error) => {
          res.status(HTTP_ERROR.INTERNAL_SERVER_ERROR).json({
            error: error.message
          });
        });
  }

  updateGroup({body, params}: Request, res: Response): void {
    const {id} = params;
    const {name, permissions} = body;

    const group = {
      name,
      permissions,
      id,
    } as Group;

    this.groupsService.update(group).then((g) => res.json(g));
  }

  deleteGroup(
      {params}: Request,
      res: Response,
      ): void {
    this.groupsService.remove(params.id).then((group) => res.json(group));
  };

  addUsersToGroup({body}: Request, res: Response): void {
    const {userIds, groupId} = body;
    this.groupsService.addUsersToGroup(groupId, userIds)
        .then((updatedCount) => res.json(updatedCount));
  };
}
