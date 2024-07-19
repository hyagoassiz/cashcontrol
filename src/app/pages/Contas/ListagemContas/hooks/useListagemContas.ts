import { Dispatch, useContext } from "react";
import { IConta } from "../interfaces";
import { ListagemContasContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";

interface IUseListagemContas {
  isLoading: boolean;
  contas: IConta[] | undefined;
  toggleModalConta: boolean;
  setToggleFilter: Dispatch<boolean>;
  toggleSearchBar: boolean;
  setToggleSearchBar: Dispatch<boolean>;
  textFilter: string;
  setTextFilter: Dispatch<string>;
  setAtivarInativarContaData: Dispatch<IConta>;
  handleModalConta: () => void;
  handleEditarConta(conta: IConta): void;
  handleNavigate: () => void;
  refetch: () => void;
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
    setAtivarInativarContaData,
    setToggleModalConta,
    toggleModalConta,
    setConta,
  } = useContext(ListagemContasContext);

  const navigate = useNavigate();

  const handleEditarConta = (data: IConta) => {
    setConta(data);
    handleModalConta();
  };

  const handleModalConta = () => {
    setToggleModalConta((prevState) => !prevState);
  };

  const handleNavigate = () => {
    navigate(PATHS.MENU.LIST);
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
    setAtivarInativarContaData,
    handleModalConta,
    handleEditarConta,
    handleNavigate,
    refetch,
  };
};
