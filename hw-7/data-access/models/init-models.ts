import {BelongsToManyOptions, Sequelize} from 'sequelize/types';

import makeGroupModel from './group.model';
import makeUserGroupModel from './user-group.model';
import makeUserModel from './user.model';

export default (sequelize: Sequelize) => {
  const UserModel = makeUserModel(sequelize);
  const GroupModel = makeGroupModel(sequelize);
  const UserGroupModel = makeUserGroupModel(sequelize);

  GroupModel.belongsToMany(UserModel, {
    through: UserGroupModel,
    foreignKey: 'groupId',
    onDelete: 'CASCADE',
  } as BelongsToManyOptions);

  UserModel.belongsToMany(GroupModel, {
    through: UserGroupModel,
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  } as BelongsToManyOptions);
};