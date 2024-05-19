/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ICategoria } from "../interfaces";
import { obterCategoriasPorUsuario } from "../services/endpoints";
import { CategoriaService } from "../services/CategoriaService";
import { ListagemCategoriasContext } from "../contexts";
// import { ProgressContext } from "../../../shared/contexts/ProgressContext";

interface IUseListagemCategorias {
  isLoading: boolean;
  categorias: ICategoria[];
  handleEditarCategoria: (id: string, ativo: boolean) => void;
}

export const useListagemCategorias = (): IUseListagemCategorias => {
  const { textFilter, filterData} = useContext(ListagemCategoriasContext)

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [categorias, setCategorias] = useState<ICategoria[]>([]);


  // const { setLoading} = useContext(ProgressContext)
  

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // setLoading(true)
      const categoriasDoUsuario = await obterCategoriasPorUsuario(
        "DxARypJQGMZeb1fMT4ft4BI4S2D2", filterData
      );
      setCategorias(categoriasDoUsuario);
    } catch (error) {
      console.error("Erro ao obter categorias do usuário:", error);
    } finally {
      setIsLoading(false);
      // setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterData]);

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
    handleEditarCategoria,
  };
};
