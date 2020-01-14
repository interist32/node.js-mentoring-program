import uuid from 'uuid';
import { User } from '@app-models/user';


/** Simple memory storage for users. */
export default class UsersStorage {
  private users: User[] = [];

  add(user: User): User | null {
    if (this.getUserByLogin(user.login)) return null;

    const newUser: User = {
      ...user,
      id: uuid(),
      isDeleted: false,
    };
    this.users = [...this.users, newUser];

    return newUser;
  }


  /**
   * Returns list of users. Optionally might be filtered and limited.
   * @param login substring for login name
   * @param limit count of final collection
   */
  getUsers(login?: string, limit?: number): User[] {
    let { users } = this;

    users = users.filter((u) => !u.isDeleted);

    if (login) {
      users = users.filter((u) => u.login.includes(login));
    }
    if (limit && limit > 0) {
      users = users.slice(0, limit);
    }
    return users;
  }

  update(user: User): User | null {
    const { id, isDeleted, ...existingUser } = this.getUserById(user.id) || {};
    if (!id) return null;

    const updatedUser = {
      ...existingUser,
      ...user,
      isDeleted,
      id,
    };

    const userIndex = this.users.findIndex((u) => u.id === user.id);
    this.users = [
      ...this.users.slice(0, userIndex), updatedUser,
      ...this.users.slice(userIndex + 1),
    ];

    return updatedUser;
  }

  remove(id: string): User | null {
    const user = this.getUserById(id);
    if (!user) return null;

    user.isDeleted = true;

    return user;
  }

  getUserById(id: string): User | null {
    return this.getUsers().find((u) => u.id === id && !u.isDeleted) || null;
  }

  private getUserByLogin(login: string): User | undefined {
    return this.getUsers().find(
      (u) => u.login.toLowerCase() === login.toLowerCase(),
    );
  }
}
