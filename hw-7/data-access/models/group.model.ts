import {Group, GroupPermission} from '@app-models/group.inteface';
import {DataTypes, Model, Sequelize} from 'sequelize';


/** Group model. */
export class GroupModel extends Model implements Group {
  id!: string;
  name!: string;
  permissions!: Array<GroupPermission>;
}

export default (sequelize: Sequelize): typeof GroupModel => {
  GroupModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        permissions: DataTypes.ARRAY(DataTypes.STRING),
      },
      {
        sequelize,
        tableName: 'group',
      });
  return GroupModel;
};