import { useContext } from "react";
import { ListagemContext } from "../context";
import { ITransacao } from "../../../../shared/interfaces";

interface IUseListagem {
  handleModalTransacoes: () => void;
  transacoes: ITransacao[] | undefined;
  isFetchingTransacoes: boolean;
  handleEditarTransacao(data: ITransacao): void;
  handleExcluirTransacao(data: ITransacao): void;
}

export const useListagem = (): IUseListagem => {
  const {
    setToggleModalTransacoes,
    transacoes,
    isFetchingTransacoes,
    setTransacao,
    setToggleModalExcluir,
  } = useContext(ListagemContext);

  const handleModalTransacoes = () => {
    setToggleModalTransacoes((prevState) => !prevState);
  };

  const handleEditarTransacao = (data: ITransacao) => {
    setTransacao(data);
    setToggleModalTransacoes((prevState) => !prevState);
  };

  const handleExcluirTransacao = (data: ITransacao) => {
    setTransacao(data);
    setToggleModalExcluir((prevState) => !prevState);
  };

  return {
    handleModalTransacoes,
    transacoes,
    isFetchingTransacoes,
    handleEditarTransacao,
    handleExcluirTransacao,
  };
};
