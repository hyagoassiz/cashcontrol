export interface ITransacao {
  id?: string;
  usuario: string;
  data: string;
  tipo: "Entrada" | "Saída";
  categoria: string;
  conta: string;
  valor: number;
  pago: boolean;
  observacao: string;
}
