import { ICategoria } from "../interfaces"
import { adcionarCategoria, obterCategoriasPorUsuario } from "./endpoints"

export const CategoriaService = {
    async criarCategoria(categoriaData: ICategoria) {
      try {
        const response = await adcionarCategoria(categoriaData);
        // Verifica a resposta e retorna de acordo com a resposta do backend
        if (response.status === 200) {
          return { success: true, message: 'Categoria adicionada com sucesso!' };
        } else {
          return { success: false, message: 'Erro ao adicionar categoria.' };
        }
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        return { success: false, message: 'Erro ao criar categoria. Verifique sua conexão com a internet.' };
      }
    },
    async obterCategoriasPorUsuario(usuario: string): Promise<ICategoria[]> {
      try {
        const categorias = await obterCategoriasPorUsuario(usuario);
        return categorias;
      } catch (error) {
        console.error('Erro ao obter categorias do usuário:', error);
        return [];
      }
    }
  }
  
