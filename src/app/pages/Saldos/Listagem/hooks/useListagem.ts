import { useContext } from "react";
import { ListagemContext } from "../context";
import { ISaldo } from "../../../../shared/interfaces";

interface IUseListagem {
  saldos: ISaldo[];
  isFetchingMovimentacoes: boolean;
}

export const useListagem = (): IUseListagem => {
  const { saldos, isFetchingMovimentacoes } = useContext(ListagemContext);

  return {
    saldos,
    isFetchingMovimentacoes,
  };
};
