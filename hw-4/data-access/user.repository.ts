import {
  Sequelize, DataTypes, Op, WhereAttributeHash,
} from 'sequelize';
import { User } from '@app-models/user';

import uuid from 'uuid';
import CONNECTION_STRING from './config';

const connectionString = process.env.CONNECTION_STRING || CONNECTION_STRING;

export default class UserRepository {
  private readonly sequelize: Sequelize;

  private readonly userModel = User;

  constructor() {
    this.sequelize = new Sequelize(connectionString, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
      },
    });

    this.sequelize.authenticate()
      .then(() => console.log('Database connection established'))
      .catch((error) => console.log(`Connection failed: ${error}`));

    this.initModel();
  }

  private initModel(): void {
    this.userModel.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.SMALLINT,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize: this.sequelize,
      tableName: 'user',
      defaultScope: {
        attributes: {
          exclude: ['isDeleted'],
        },
      },
    });
  }

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
