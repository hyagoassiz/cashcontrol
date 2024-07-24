import { ICategoria, IReturnBackEnd } from "../interfaces";
import {
  queryAdicionarCategoria,
  queryEditarCategoria,
  queryListarCategoria,
} from "../queries/queriesCategoria";

export const CategoriaService = {
  async fetchCategoria(usuario: string): Promise<ICategoria[]> {
    const response = await queryListarCategoria(usuario);
    return response;
  },
  async addCategoria(payload: ICategoria): Promise<IReturnBackEnd> {
    const response = await queryAdicionarCategoria(payload);
    return response;
  },
  async editCategoria(payload: ICategoria): Promise<IReturnBackEnd> {
    const response = await queryEditarCategoria(payload);
    return response;
  },
};
