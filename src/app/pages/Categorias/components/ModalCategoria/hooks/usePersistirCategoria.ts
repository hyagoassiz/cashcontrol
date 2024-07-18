/* eslint-disable react-hooks/exhaustive-deps */

import { useListagemCategorias } from "../../../hooks/useListagemCategorias";
import { ICategoria } from "../../../interfaces";
import { CategoriaService } from "../../../services/CategoriaService";

interface IUsePersistirCategoria {
  handleCriarCategoria: (data: ICategoria) => void;
  handleEditarCategoria: (data: ICategoria) => void;
}

export const usePersistirCategoria = (): IUsePersistirCategoria => {
  const { refetch } = useListagemCategorias();
  const handleCriarCategoria = async (data: ICategoria) => {
    try {
      const response = await CategoriaService.criarCategoria(data);
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    } finally {
      refetch();
    }
  };

  const handleEditarCategoria = async (data: ICategoria) => {
    try {
      const response = await CategoriaService.editarCategoria(data);
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    } finally {
      refetch();
    }
  };

  return {
    handleCriarCategoria,
    handleEditarCategoria,
  };
};
