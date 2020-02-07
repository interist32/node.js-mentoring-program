import { Group, UserGroup } from '@app-models/index';
import uuid from 'uuid';
import sequelize from '../sequelize/sequalize';


export default class GroupRepository {
  private readonly groupModel = Group;

  private readonly userGroupModel = UserGroup;

  getGroups(): Promise<Group[]> {
    return this.groupModel.findAll();
  }

  getGroupById(id: string): Promise<Group> {
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
    const { name, permissions } = group;

    return this.groupModel.create<Group>({
      id: uuid(),
      name,
      permissions,
    }, {});
  }

  update(group: Group): Promise<Group> {
    const {
      id, name, permissions,
    } = group;

    return this.groupModel.update({
      name,
      permissions,
    }, {
      where: {
        id,
      },
      returning: true,
    }).then(([number, updatedGroups]) => number && updatedGroups[0]);
  }

  remove(id: string): Promise<number> {
    return this.groupModel.destroy({
      where: {
        id,
      },
    });
  }

  addUsersToGroup(groupId: string, userIds: string[]): Promise<number> {
    return sequelize.transaction((t) => {
      const bulk: Promise<UserGroup>[] = [];

      userIds.forEach((userId) => {
        bulk.push(this.userGroupModel.create({
          groupId,
          userId,
        }, { transaction: t }));
      });

      return Promise.all(bulk).then((res) => res.length);
    });
  }
}
