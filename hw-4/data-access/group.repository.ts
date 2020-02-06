import { Sequelize, DataTypes } from 'sequelize';
import Group from '@app-models/group';

import uuid from 'uuid';
import CONNECTION_STRING from './config';

const connectionString = process.env.CONNECTION_STRING || CONNECTION_STRING;

export default class GroupRepository {
  private readonly sequelize: Sequelize;

  private readonly groupModel = Group;

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
    this.groupModel.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      permissions: DataTypes.ARRAY,
    }, {
      sequelize: this.sequelize,
      tableName: 'group',
    });

    this.groupModel.sync();
  }

  getGroups(): Promise<Group[]> {
    return this.groupModel.findAll();
  }

  getGroupById(id: string): Promise<Group> {
    return this.groupModel.findOne({
      where: {
        id,
      },
    });
  }

  getGroupByName(name: string): Promise<Group|null> {
    return this.groupModel.findOne({
      where: {
        name,
      },
    });
  }

  add(group: Group): Promise<Group> {
    const { name, permissions } = group;
    return this.groupModel.create({
      id: uuid(),
      name,
      permissions,
    }, {});
  }

  update(group: Group): Promise<Group> {
    const {
      id, name, permissions,
    } = group;

    return this.groupModel.update({
      name,
      permissions,
    }, {
      where: {
        id,
      },
      returning: true,
    }).then(([number, updatedGroups]) => number && updatedGroups[0]);
  }

  remove(id: string): Promise<number> {
    return this.groupModel.destroy({
      where: {
        id,
      },
    });
  }
}
