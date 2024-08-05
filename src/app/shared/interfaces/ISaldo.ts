export interface ISaldo {
  conta: string;
  valores: {
    pago: {
      entradas: number;
      saidas: number;
    };
    pendente: {
      entradas: number;
      saidas: number;
    };
  };
}
