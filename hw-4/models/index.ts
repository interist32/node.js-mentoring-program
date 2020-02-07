// Associations have to be defined only after all models was initialized
import { BelongsToManyOptions } from 'sequelize';

import Group from './group';
import { User, UserRequestSchema } from './user';
import UserGroup from './userGroup';


Group.belongsToMany(User, {
  through: UserGroup,
  foreignKey: 'groupId',
  onDelete: 'CASCADE',
} as BelongsToManyOptions);

User.belongsToMany(Group, {
  through: UserGroup,
  foreignKey: 'userId',
  onDelete: 'CASCADE',
} as BelongsToManyOptions);

// User.sync();
// Group.sync();
// UserGroup.sync();

export {
  User,
  UserRequestSchema,
  Group,
  UserGroup,
};
