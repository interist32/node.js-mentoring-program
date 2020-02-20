import { User } from '@app-models/user';
import UserRepository from '../data-access/user.repository';


function prepareUser(user: User): Partial<User> | null {
  if (!user) return null;

  const { id, login, password } = user;

  return {
    id,
    login,
    password,
  };
}

export default class UsersService {
  private readonly usersRepository: UserRepository;

  constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  add(user: User): Promise<User> {
    return this.usersRepository.getUserByLogin(user.login)
      .then((existingUser) => {
        if (existingUser) {
          throw new Error('User with such login already exists');
        } else {
          return this.usersRepository.add(user);
        }
      });
  }

  getUsers(login?: string, limit?: number): Promise<Array<Partial<User>>> {
    return this.usersRepository.getUsers(login, limit).then((users) => {
      const partialUsers: Array<Partial<User>> = [];

      users.forEach((user) => {
        const partialUser = prepareUser(user);

        if (partialUser) {
          partialUsers.push(partialUser);
        }
      });

      return partialUsers;
    });
  }

  getUserById(userId: string): Promise<Partial<User>|null> {
    return this.usersRepository.getUserById(userId).then(prepareUser);
  }

  update(user: User): Promise<Partial<User> | null> {
    return this.usersRepository.update(user).then(prepareUser);
  }

  remove(id: string): Promise<Partial<User> | null> {
    return this.usersRepository.remove(id).then(prepareUser);
  }
}
