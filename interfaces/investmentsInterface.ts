export interface Investments {
  id?: number;
  user_id: number;
  stockName: string;
  action: string; // 'buy' or 'sell'
  quantity: number;
  price: number;
}

export enum investmentsEnum {
    acciones = "acciones",
    fondos = "fondos",
    bonos = "bonos"
  }

  export enum stateEnum {
   cerrado = "cerrado",
    abierto = "abierto",
  }
