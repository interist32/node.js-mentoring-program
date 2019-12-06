import * as Joi from '@hapi/joi';

/** User model. */
export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

/** User validation schema. */
export const userSchema = Joi.object<User>({
  id: Joi.string(),
  login: Joi.string().required(),
  password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean(),
});
