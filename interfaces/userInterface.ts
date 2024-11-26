export enum profileEnum{
  master = "master",
  middle = "middle",
  junior = "junior"
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