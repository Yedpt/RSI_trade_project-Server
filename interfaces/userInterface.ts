import { Request } from 'express';
export interface IUser {
  id: number;
  username: string;
}

export interface IUserRequest extends Request {
    user?: {
        id: number;
        username: string;
    };
}

export enum profileEnum{
  impulsivo = "impulsivo",
  medio = "medio",
  reservado = "reservado"
}
export interface Users {
    id?: number
    rol: string;
    nickname: string;
    profile: profileEnum ;
    avatar: string;
    created_at : string
    hasCompletedMiFID: boolean;
  }