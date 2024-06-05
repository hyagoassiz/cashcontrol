/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ICategoria } from "../interfaces";
import { obterCategoriasPorUsuario } from "../services/endpoints";
import { CategoriaService } from "../services/CategoriaService";
import { ListagemCategoriasContext } from "../contexts";

interface IUseListagemCategorias {
  isLoading: boolean;
  categorias: ICategoria[];
  categoria: ICategoria | null;
  modeShowCategoria: boolean;
  modeEditCategoria: boolean;
  toggleModalCategoria: boolean;
  handleEditarCategoria: (id: string, ativo: boolean) => void;
  handleShowCategoria(handleShowCategoria: ICategoria): void;
  handleModalCategoria: () => void;
  handleEditarCategoria2: () => void; //ajustar o nome pois tem outra função com o mesmo nome
  fetchData: () => void;
}

export const useListagemCategorias = (): IUseListagemCategorias => {
  const { textFilter, filterData, reload } = useContext(
    ListagemCategoriasContext
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [modeShowCategoria, setModeShowCategoria] = useState<boolean>(false);
  const [modeEditCategoria, setModeEditCategoria] = useState<boolean>(false);
  const [toggleModalCategoria, setToggleModalCategoria] =
    useState<boolean>(false);

  // const { setLoading} = useContext(ProgressContext)

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // setLoading(true)
      const categoriasDoUsuario = await obterCategoriasPorUsuario(
        "DxARypJQGMZeb1fMT4ft4BI4S2D2",
        filterData
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
  }, [filterData, reload]);

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
      await CategoriaService.editarSituacao(id, ativo);
      fetchData();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    } finally {
      setIsLoading(false);
      fetchData();
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
    fetchData,
  };
};
