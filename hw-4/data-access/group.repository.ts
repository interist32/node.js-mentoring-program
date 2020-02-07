import { Group } from '@app-models/index';

import uuid from 'uuid';


export default class GroupRepository {
  private readonly groupModel = Group;

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
    return this.groupModel.create({
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
}
