/** User model. */
export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
