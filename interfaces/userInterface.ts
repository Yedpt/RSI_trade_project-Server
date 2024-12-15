export enum profileEnum{
  impulsivo = "impulsivo",
  medio = "medio",
  reservado = "reservado"
}

export interface Users {
    id?: number
    nickname: string;
    avatar?: string;
    created_at?: string
    hasCompletedMiFID: boolean;
    dni: string;
    earnings: string;
  }