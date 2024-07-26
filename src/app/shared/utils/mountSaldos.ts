import { IMovimentacao, ISaldo } from "../interfaces";

export const mountSaldos = (movimentacoes: IMovimentacao[]): ISaldo[] => {
  const resultado = Object.values(
    movimentacoes.reduce(
      (acc: { [key: string]: ISaldo }, obj: IMovimentacao) => {
        if (!acc[obj.conta]) {
          acc[obj.conta] = {
            conta: obj.conta,
            valores: {
              pago: {
                entradas: 0,
                saidas: 0,
              },
              pendente: {
                entradas: 0,
                saidas: 0,
              },
            },
          };
        }

        const valores = acc[obj.conta].valores;

        if (obj.tipo === "Entrada") {
          if (obj.pago) {
            valores.pago.entradas += obj.valor;
          } else {
            valores.pendente.entradas += obj.valor;
          }
        } else {
          if (obj.pago) {
            valores.pago.saidas += obj.valor;
          } else {
            valores.pendente.saidas += obj.valor;
          }
        }

        return acc;
      },
      {}
    )
  );

  return resultado;
};
