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