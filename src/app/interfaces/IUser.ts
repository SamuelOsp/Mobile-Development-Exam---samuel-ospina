export interface IUser{
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserLogin extends Pick<IUser, 'email' | 'password'>{}