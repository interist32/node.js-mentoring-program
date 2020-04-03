import {UserGroup} from '@app-models/user-group.interface';
import {DataTypes, Model, Sequelize} from 'sequelize';

/** UserGroup model. */
export class UserGroupModel extends Model implements UserGroup {
  userId!: string;
  groupId!: string;
}

export default (sequelize: Sequelize): typeof UserGroupModel => {
  UserGroupModel.init(
      {
        userId: DataTypes.UUID,
        groupId: DataTypes.UUID,
      },
      {
        sequelize,
        tableName: 'userGroup',
      });

  return UserGroupModel;
};
