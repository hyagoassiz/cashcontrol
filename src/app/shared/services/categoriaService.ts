import { ICategoria } from "../interfaces";
import { queryListarCategoria } from "../queries/queriesCategoria";

export const CategoriaService = {
  async fetchCategoria(usuario: string): Promise<ICategoria[]> {
    const response = await queryListarCategoria(usuario);
    return response;
  },
};
