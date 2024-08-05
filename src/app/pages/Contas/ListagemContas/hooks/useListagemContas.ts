import { Dispatch, useContext } from "react";
import { IConta } from "../interfaces";
import { ListagemContasContext } from "../contexts";

interface IUseListagemContas {
  isLoading: boolean;
  contas: IConta[] | undefined;
  toggleModalConta: boolean;
  setToggleFilter: Dispatch<boolean>;
  toggleSearchBar: boolean;
  setToggleSearchBar: Dispatch<boolean>;
  textFilter: string;
  setTextFilter: Dispatch<string>;
  handleModalConta: () => void;
  handleEditarConta(conta: IConta): void;
  refetch: () => void;
  handleEditarSituacao(conta: IConta): void;
}

export const useListagemContas = (): IUseListagemContas => {
  const {
    isLoading,
    contas,
    refetch,
    setToggleFilter,
    setToggleSearchBar,
    toggleSearchBar,
    setTextFilter,
    textFilter,
    setToggleModalConta,
    toggleModalConta,
    setIsOpenDialog,
    setConta,
  } = useContext(ListagemContasContext);

  const handleEditarConta = (data: IConta) => {
    setConta(data);
    handleModalConta();
  };

  const handleEditarSituacao = (data: IConta) => {
    setConta(data);
    setIsOpenDialog((prevState) => !prevState);
  };

  const handleModalConta = () => {
    setToggleModalConta((prevState) => !prevState);
  };

  return {
    isLoading,
    contas,
    toggleModalConta,
    setToggleFilter,
    toggleSearchBar,
    setToggleSearchBar,
    textFilter,
    setTextFilter,
    handleModalConta,
    handleEditarConta,
    refetch,
    handleEditarSituacao,
  };
};
