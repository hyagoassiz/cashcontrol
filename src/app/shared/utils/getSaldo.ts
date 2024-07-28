import { ISaldo } from "../interfaces";

export const getSaldo = (idConta: string, saldos: ISaldo[]): number => {
  const conta = saldos.find((saldo) => saldo.conta === idConta);

  if (!conta) {
    return 0;
  }

  const saldo = conta.valores.pago.entradas - conta.valores.pago.saidas;

  return saldo;
};
