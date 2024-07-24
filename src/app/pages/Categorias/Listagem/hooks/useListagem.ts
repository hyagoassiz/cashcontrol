/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ListagemCategoriasContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { ICategoria } from "../../../../shared/interfaces";
import * as PATHS from '../../../../routes/paths';

interface IUseListagem {
  isLoading: boolean;
  categorias: ICategoria[] | undefined;
  categoria: ICategoria | undefined;
  handleEditarCategoria: (data: ICategoria) => void;
  handleModalCategoria: () => void;
  refetch: () => void;
  handleNavigate: () => void;
  handleSearchBar: () => void;
  toggleSearchBar: boolean;
  setTextFilter: Dispatch<SetStateAction<string>>;
  textFilter: string;
  handleEditarSituacao(data: ICategoria): void;
  toggleFilter: boolean;
  handleToggleFilter(): void;
}

export const useListagem = (): IUseListagem => {
  const {
    filterData,
    reload,
    refetch,
    setCategoria,
    categoria,
    categorias,
    setToggleModalCategoria,
    isLoading,
    setToggleSearchBar,
    toggleSearchBar,
    setTextFilter,
    textFilter,
    setToggleModalSituacao,
    setToggleFilter,
    toggleFilter,
  } = useContext(ListagemCategoriasContext);

  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [filterData, reload]);

  const handleEditarCategoria = (data: ICategoria) => {
    setCategoria(data);
    handleModalCategoria();
  };

  const handleModalCategoria = () => {
    if (categoria) {
      setCategoria(undefined);
    }
    setToggleModalCategoria((prevState) => !prevState);
  };

  const handleSearchBar = () => {
    setToggleSearchBar((prevState) => !prevState);
  };

  const handleEditarSituacao = (data: ICategoria) => {
    setCategoria(data);
    setToggleModalSituacao((prevState) => !prevState);
  };

  const handleToggleFilter = () => {
    setToggleFilter((prevState) => !prevState);
  };

  const handleNavigate = () => {
    navigate(PATHS.MENU.LIST);
  };

  return {
    isLoading,
    handleEditarCategoria,
    handleModalCategoria,
    categorias,
    categoria,
    refetch,
    handleNavigate,
    handleSearchBar,
    toggleSearchBar,
    setTextFilter,
    textFilter,
    handleEditarSituacao,
    toggleFilter,
    handleToggleFilter,
  };
};
