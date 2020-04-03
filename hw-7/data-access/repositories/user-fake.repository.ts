import {User} from '@app-models/user.interface';

import {UserRepository} from './user.repository.interface';

export default class UserFakeRepository implements UserRepository {
  add(user: User): Promise<User> {
    return Promise.resolve({} as User);
  }

  getUserByLogin(login: string): Promise<User|null> {
    return Promise.resolve({} as User);
  }
  getUsers(login?: string, limit?: number): Promise<User[]> {
    return Promise.resolve([]);
  }
  getUserById(id: string): Promise<User|null> {
    return Promise.resolve({} as User);
  }
  update(user: User): Promise<User> {
    return Promise.resolve({} as User);
  }
  remove(id: string): Promise<User> {
    return Promise.resolve({} as User);
  }
}