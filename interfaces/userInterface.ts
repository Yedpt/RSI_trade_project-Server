import { Request } from 'express';
export interface IUser {
  id: number;
  username: string;
}

export interface IUserRequest extends Request {
  user?: IUser;
}

export enum profileEnum{
  impulsivo = "impulsivo",
  medio = "medio",
  reservado = "reservado"
}

export interface Users {
    id?: number
    rol: string;
    name: string;
    email: string;
    password: string;
    profile: profileEnum ;
    avatar: string;
    created_at : string
  }