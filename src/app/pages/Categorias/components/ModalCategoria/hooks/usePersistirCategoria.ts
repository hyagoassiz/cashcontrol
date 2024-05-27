/* eslint-disable react-hooks/exhaustive-deps */

import { useContext } from "react";
import { ICategoria } from "../../../interfaces";
import { CategoriaService } from "../../../services/CategoriaService";
import { UserContext } from "../../../../../shared/contexts";

interface IUsePersistirCategoria {
  handlePersistirCategoria: (data: ICategoria) => void;
}

export const usePersistirCategoria = (): IUsePersistirCategoria => {
  const { userId } = useContext(UserContext);

  const handlePersistirCategoria = async (data: ICategoria) => {
    try {
      const categoriaComIdUsuario = { ...data, ativo: true, usuario: userId };
      const response = await CategoriaService.criarCategoria(
        categoriaComIdUsuario
      );
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  return {
    handlePersistirCategoria,
  };
};
