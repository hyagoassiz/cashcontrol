import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useContext } from "react";
import { ListagemContext } from "../context";
import { IMovimentacao } from "../interfaces";

interface IUseListagem {
  handleNavigate: () => void;
  handleModalMovimentacoes: () => void;
  movimentacoes: IMovimentacao[] | undefined;
  isFetchingMovimentacoes: boolean;
  handleEditarMovimentacao(data: IMovimentacao): void;
  handleExcluirMovimentacao(data: IMovimentacao): void;
}

export const useListagem = (): IUseListagem => {
  const {
    setToggleModalMovimentacoes,
    movimentacoes,
    isFetchingMovimentacoes,
    setMovimentacao,
    setToggleModalExcluir,
  } = useContext(ListagemContext);

  const navigate = useNavigate();

  const handleModalMovimentacoes = () => {
    setToggleModalMovimentacoes((prevState) => !prevState);
  };

  const handleEditarMovimentacao = (data: IMovimentacao) => {
    setMovimentacao(data);
    setToggleModalMovimentacoes((prevState) => !prevState);
  };

  const handleExcluirMovimentacao = (data: IMovimentacao) => {
    setMovimentacao(data);
    setToggleModalExcluir((prevState) => !prevState);
  };

  const handleNavigate = () => {
    navigate(PATHS.MENU.LIST);
  };

  return {
    handleNavigate,
    handleModalMovimentacoes,
    movimentacoes,
    isFetchingMovimentacoes,
    handleEditarMovimentacao,
    handleExcluirMovimentacao,
  };
};
