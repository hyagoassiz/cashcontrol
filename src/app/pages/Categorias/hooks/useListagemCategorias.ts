/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ICategoria } from "../interfaces";
import { obterCategoriasPorUsuario } from "../services/endpoints";
import { CategoriaService } from "../services/CategoriaService";
import { ListagemCategoriasContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../routes/paths";
import { useQuery } from "@tanstack/react-query";

interface IUseListagemCategorias {
  isLoading: boolean;
  categorias: ICategoria[] | undefined;
  categoria: ICategoria | null;
  modeShowCategoria: boolean;
  modeEditCategoria: boolean;
  toggleModalCategoria: boolean;
  handleEditarCategoria: (id: string, ativo: boolean) => void;
  handleShowCategoria(handleShowCategoria: ICategoria): void;
  handleModalCategoria: () => void;
  handleEditarCategoria2: () => void; //ajustar o nome pois tem outra função com o mesmo nome
  refetch: () => void;
  handleNavigate: () => void;
}

export const useListagemCategorias = (): IUseListagemCategorias => {
  const { filterData, reload } = useContext(ListagemCategoriasContext);

  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [modeShowCategoria, setModeShowCategoria] = useState<boolean>(false);
  const [modeEditCategoria, setModeEditCategoria] = useState<boolean>(false);
  const [toggleModalCategoria, setToggleModalCategoria] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const {
    data: categorias,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: () =>
      obterCategoriasPorUsuario("DxARypJQGMZeb1fMT4ft4BI4S2D2", filterData),
  });

  useEffect(() => {
    refetch();
  }, [filterData, reload]);

  const handleEditarCategoria = async (id: string, ativo: boolean) => {
    try {
      await CategoriaService.editarSituacao(id, ativo);
      refetch();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    } finally {
      refetch();
    }
  };

  const handleShowCategoria = (data: ICategoria) => {
    setCategoria(data);
    setModeShowCategoria(true);
    handleModalCategoria();
  };

  const handleModalCategoria = () => {
    if (categoria) {
      setCategoria(null);
      setModeShowCategoria(false);
      setModeEditCategoria(false);
    }
    setToggleModalCategoria((prevState) => !prevState);
  };

  const handleEditarCategoria2 = () => {
    setModeShowCategoria(false);
    setModeEditCategoria(true);
  };

  const handleNavigate = () => {
    navigate(PATHS.MENU.LIST);
  };

  return {
    isLoading,
    categorias,
    modeShowCategoria,
    modeEditCategoria,
    toggleModalCategoria,
    handleEditarCategoria,
    handleShowCategoria,
    handleModalCategoria,
    handleEditarCategoria2,
    categoria,
    refetch,
    handleNavigate,
  };
};
