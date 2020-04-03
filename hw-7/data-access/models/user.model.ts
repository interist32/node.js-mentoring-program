import {User} from 'entities/user.interface';
import {DataTypes, Model, Sequelize} from 'sequelize';

/** User model. */
export class UserModel extends Model implements User {
  id!: string;
  login!: string;
  password!: string;
  age!: number;
  isDeleted?: boolean;
}

export default (sequelize: Sequelize): typeof UserModel => {
  UserModel.init(
      {
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
      },
      {
        sequelize,
        tableName: 'user',
        defaultScope: {
          attributes: {
            exclude: ['isDeleted'],
          },
        },
      });

  return UserModel;
};
