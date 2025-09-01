export interface IUser {
  uuid: string;
  name: string;
  lastname: string; 
  email: string;
  password: string;
}

export type IUserLogin = Pick<IUser, 'email' | 'password'>;
