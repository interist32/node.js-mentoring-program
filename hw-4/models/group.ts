import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize/sequalize';


type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

/** User model. */
export default class Group extends Model {
  id!: string;

  name!: string;

  permissions!: Array<Permission>;
}

Group.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  permissions: DataTypes.ARRAY(DataTypes.STRING),
}, {
  sequelize,
  tableName: 'group',
});
