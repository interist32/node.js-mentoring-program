import { Model } from 'sequelize';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

/** User model. */
export default class Group extends Model {
  id!: string;

  name!: string;

  permissions: Permission[] = [];
}
