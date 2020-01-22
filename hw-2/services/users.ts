import { User } from '@app-models/user';
import UsersRepository from '../data-access/usersRepository';


export default class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
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

  getUsers(login?: string, limit?: number): Promise<User[]> {
    return this.usersRepository.getUsers(login, limit);
  }

  getUserById(id: string): Promise<User> {
    return this.usersRepository.getUserById(id);
  }

  update(user: User): Promise<User> {
    return this.usersRepository.update(user);
  }

  remove(id: string): Promise<User> {
    return this.usersRepository.remove(id);
  }
}
