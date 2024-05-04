/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ICategoria } from "../interfaces";
import { obterCategoriasPorUsuario } from "../services/endpoints";
import { FilterContext } from "../contexts/filterContext";
import { CategoriaService } from "../services/CategoriaService";

interface IUseListagemCategorias {
  isLoading: boolean;
  categorias: ICategoria[];
  setTextFilter: (data: string) => void;
  textFilter: string;
  handleEditarCategoria: (id: string, ativo: boolean) => void;
}

export const useListagemCategorias = (): IUseListagemCategorias => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const [textFilter, setTextFilter] = useState<string>("");
  
  const { situacao} = useContext(FilterContext)
  

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const categoriasDoUsuario = await obterCategoriasPorUsuario(
        "DxARypJQGMZeb1fMT4ft4BI4S2D2", situacao
      );
      setCategorias(categoriasDoUsuario);
    } catch (error) {
      console.error("Erro ao obter categorias do usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [situacao]);

  useEffect(() => {
    const filterCategories = () => {
      const result = categorias.filter(
        (value) =>
          value.nome.toUpperCase().includes(textFilter.toUpperCase()) ||
          String(value.nome).toUpperCase().includes(textFilter.toUpperCase())
      );
      setCategorias(result);
    };

    if (textFilter.length > 1) {
      filterCategories();
    } else if (textFilter.length === 0) {
      setIsLoading(true);
      fetchData();
    }
  }, [textFilter]);

  const handleEditarCategoria = async (id: string, ativo: boolean) => {
    try {
      setIsLoading(true);
      await CategoriaService.editarCategoria(id, ativo);
      fetchData();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    categorias,
    setTextFilter,
    textFilter,
    handleEditarCategoria,
  };
};
