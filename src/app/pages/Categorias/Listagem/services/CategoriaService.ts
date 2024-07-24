import { ICategoria } from "../../../../shared/interfaces";
import {
  adcionarCategoria,
  editarCategoria,
  editarSituacaoCategoria,
  obterCategoriasPorUsuario,
} from "./endpoints";

export const CategoriaService = {
  async criarCategoria(categoriaData: ICategoria) {
    try {
      const response = await adcionarCategoria(categoriaData);
      if (response.status === 200) {
        return { success: true, message: "Categoria adicionada com sucesso!" };
      } else {
        return { success: false, message: "Erro ao adicionar categoria." };
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      return {
        success: false,
        message:
          "Erro ao criar categoria. Verifique sua conexão com a internet.",
      };
    }
  },
  async obterCategoriasPorUsuario(
    usuario: string,
    ativo: boolean[]
  ): Promise<ICategoria[]> {
    try {
      const categorias = await obterCategoriasPorUsuario(usuario, ativo);
      return categorias;
    } catch (error) {
      console.error("Erro ao obter categorias do usuário:", error);
      return [];
    }
  },
  async editarSituacao({ id, ativo }: { id: string; ativo: boolean }) {
    try {
      const response = await editarSituacaoCategoria(id, ativo);
      if (response.status === 200) {
        return { success: true, message: "Categoria editada com sucesso!" };
      } else {
        return { success: false, message: "Erro ao editar categoria." };
      }
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      return {
        success: false,
        message:
          "Erro ao editar categoria. Verifique sua conexão com a internet.",
      };
    }
  },
  async editarCategoria(data: ICategoria) {
    try {
      const response = await editarCategoria(data);
      if (response.status === 200) {
        return { success: true, message: "Categoria editada com sucesso!" };
      } else {
        return { success: false, message: "Erro ao editar categoria." };
      }
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      return {
        success: false,
        message:
          "Erro ao editar categoria. Verifique sua conexão com a internet.",
      };
    }
  },
};
