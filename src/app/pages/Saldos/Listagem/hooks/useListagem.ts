import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useContext } from "react";
import { ListagemContext } from "../context";
import { ISaldo } from "../../../../shared/interfaces";

interface IUseListagem {
  saldos: ISaldo[];
  handleNavigate: () => void;
  isFetchingMovimentacoes: boolean;
}

export const useListagem = (): IUseListagem => {
  const { saldos, isFetchingMovimentacoes } = useContext(ListagemContext);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PATHS.MENU.LIST);
  };

  return {
    handleNavigate,
    saldos,
    isFetchingMovimentacoes,
  };
};
