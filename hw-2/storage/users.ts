import uuid from 'uuid';

import {User} from '../models/user';

/** Simple memory storage for users. */
export class UsersStorage {
  private users: User[] = [];

  add(user: User) {
    if (this.getUserByLogin(user.login)) return;

    user.id = uuid();
    user.isDeleted = false;
    this.users = [
      ...this.users,
      user,
    ];
  }

  /**
   * Returns list of users. Optionally might be filtered and limited.
   * @param login substring for login name
   * @param limit count of final collection
   */
  getUsers(login?: string, limit?: number): User[] {
    let users = this.users;

    if (login) {
      users = users.filter(u => u.login.includes(login));
    }
    if (limit && limit > 0) {
      users = users.slice(0, limit);
    }
    return users;
  }

  getUserById(id: string): User|undefined {
    return this.users.find((u) => u.id === id);
  }

  update(user: User) {
    if (!this.userExists(user)) return;

    const existingUser = this.getUserById(user.id);

    const updatedUser = {
      ...existingUser,
      ...user,
    };

    const userIndex = this.users.findIndex(u => u.id === user.id);
    this.users = [
      ...this.users.slice(0, userIndex),
      updatedUser,
      ...this.users.slice(userIndex + 1),
    ];
  }

  remove(id: string) {
    if (!this.getUserById(id)) return;

    this.getUserById(id)!.isDeleted = true;
  }

  private userExists(user: User): boolean {
    return !!this.getUserById(user.id);
  }

  private getUserByLogin(login: string): User|undefined {
    return this.users.find(u => u.login.toLowerCase() === login.toLowerCase());
  }
}
