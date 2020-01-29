import {
  Sequelize, DataTypes, Op, WhereAttributeHash,
} from 'sequelize';
import { User } from '@app-models/user';

import uuid from 'uuid';

// Hardcoded since my repo is private, and will be deleted after merge.
const defaultConnectionString = 'postgres://iwsdzgkawdewtl:0652fa68f8c46ec0c712d0b253db84b871f1451a92698b7f20a7dee1f2a33691@ec2-54-92-174-171.compute-1.amazonaws.com:5432/d7c050r5hcsaas';
const connectionString = process.env.CONNECTION_STRING || defaultConnectionString;

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
