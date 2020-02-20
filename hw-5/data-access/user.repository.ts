import {
  Op, WhereAttributeHash,
} from 'sequelize';
import { User } from '@app-models/index';

import uuid from 'uuid';


export default class UserRepository {
  private readonly userModel = User;

  add(user: User): Promise<User> {
    const {
      login, password, age,
    } = user;

    return this.userModel.create({
      id: uuid(),
      login,
      password,
      age,
    }, {});
  }

  getUserByLogin(login: string): Promise<User|null> {
    return this.userModel.findOne({
      where: {
        login,
      },
    });
  }

  getUsers(login?: string, limit?: number): Promise<User[]> {
    let whereClause: WhereAttributeHash = {
      isDeleted: {
        [Op.eq]: false,
      },
    };

    if (login) {
      whereClause = {
        ...whereClause,
        login: {
          [Op.like]: `%${login}%`,
        },
      };
    }

    return this.userModel.findAll({
      where: whereClause,
      limit,
    });
  }

  getUserById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  update(user: User): Promise<User> {
    const {
      id, login, password, age,
    } = user;

    return this.userModel.update({
      login,
      password,
      age,
    }, {
      where: {
        id,
      },
      returning: true,
    }).then(([number, updatedUsers]) => number && updatedUsers[0]);
  }

  remove(id: string): Promise<User> {
    return this.userModel.update({
      isDeleted: true,
    }, {
      where: {
        id,
      },
      returning: true,
    }).then(([number, updatedUsers]) => number && updatedUsers[0]);
  }
}
