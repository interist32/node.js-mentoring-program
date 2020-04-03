import {Group} from '@app-models/group.inteface';

export interface GroupRepository {
  getGroups(): Promise<Group[]>;
  getGroupById(id: string): Promise<Group|null>;
  getGroupByName(name: string): Promise<Group|null>;
  add(group: Group): Promise<Group>;
  update(group: Group): Promise<Group>;
  remove(id: string): Promise<number>;
  addUsersToGroup(groupId: string, userIds: string[]): Promise<number>;
}
