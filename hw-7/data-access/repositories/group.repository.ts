import {Group} from '@app-models/group.inteface';
import uuid from 'uuid';

import {GroupModel} from '../../data-access/models/group.model';
import {UserGroupModel} from '../../data-access/models/user-group.model';
import initModels from '../models/init-models';
import sequelize from '../sequalize';

import {GroupRepository} from './group.repository.interface';


export default class GroupModelRepository implements GroupRepository {
  private readonly groupModel = GroupModel;
  private readonly userGroupModel = UserGroupModel;

  constructor() {
    initModels(sequelize);
  }

  getGroups(): Promise<Group[]> {
    return this.groupModel.findAll();
  }

  getGroupById(id: string): Promise<Group|null> {
    return this.groupModel.findOne({
      where: {
        id,
      },
    });
  }

  getGroupByName(name: string): Promise<Group|null> {
    return this.groupModel.findOne({
      where: {
        name,
      },
    });
  }

  add(group: Group): Promise<Group> {
    const {name, permissions} = group;

    return this.groupModel.create(
        {
          id: uuid(),
          name,
          permissions,
        },
        {},
    );
  }

  update(group: Group): Promise<Group> {
    const {id} = group;

    return this.groupModel
        .update(
            {
              ...group,
            },
            {
              where: {
                id,
              },
              returning: true,
            },
            )
        .then(([number, updatedGroups]) => number && updatedGroups[0] as Group);
  }

  remove(id: string): Promise<number> {
    return this.groupModel.destroy({
      where: {
        id,
      },
    });
  }

  addUsersToGroup(groupId: string, userIds: string[]): Promise<number> {
    return sequelize.transaction((transaction) => {
      const bulk: Promise<UserGroupModel>[] = [];

      userIds.forEach((userId) => {
        bulk.push(this.userGroupModel.create(
            {
              groupId,
              userId,
            },
            {transaction},
            ));
      });

      return Promise.all(bulk).then((res) => res.length);
    });
  }
}
