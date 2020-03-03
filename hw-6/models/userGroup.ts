import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize/sequalize';

export default class UserGroup extends Model {
  userId!: string;

  groupId!: string;
}

UserGroup.init({
  userId: DataTypes.UUID,
  groupId: DataTypes.UUID,
}, {
  sequelize,
  tableName: 'userGroup',
});
