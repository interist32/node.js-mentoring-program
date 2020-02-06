import Group from '@app-models/group';
import GroupRepository from '../data-access/group.repository';

export default class GroupService {
  private readonly groupRepository: GroupRepository;

  constructor(usersRepository: GroupRepository) {
    this.groupRepository = usersRepository;
  }

  add(group: Group): Promise<Group> {
    return this.groupRepository.getGroupByName(group.name)
      .then((existingGroup) => {
        if (existingGroup) {
          throw new Error('Group with such name already exists');
        } else {
          return this.groupRepository.add(group);
        }
      });
  }

  getGroups(): Promise<Array<Group>> {
    return this.groupRepository.getGroups();
  }

  getGroupById(id: string): Promise<Partial<Group>|null> {
    return this.groupRepository.getGroupById(id);
  }

  update(group: Group): Promise<Partial<Group> | null> {
    return this.groupRepository.update(group);
  }

  remove(id: string): Promise<number> {
    return this.groupRepository.remove(id);
  }
}
