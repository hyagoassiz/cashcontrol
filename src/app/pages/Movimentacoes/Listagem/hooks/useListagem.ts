import { useContext } from "react";
import { ListagemContext } from "../context";
import { IMovimentacao } from "../interfaces";

interface IUseListagem {
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

  return {
    handleModalMovimentacoes,
    movimentacoes,
    isFetchingMovimentacoes,
    handleEditarMovimentacao,
    handleExcluirMovimentacao,
  };
};
