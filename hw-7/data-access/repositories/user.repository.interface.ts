import {User} from '../../entities/user.interface';

export interface UserRepository {
  add(user: User): Promise<User>;
  getUserByLogin(login: string): Promise<User|null>;
  getUsers(login?: string, limit?: number): Promise<User[]>;
  getUserById(id: string): Promise<User|null>;
  update(user: User): Promise<User>;
  remove(id: string): Promise<User>;
}
