import { IConta } from "../interfaces";
import { queryListarConta } from "../queries/queriesContas";

export const ContaService = {
  async fetchConta(usuario: string): Promise<IConta[]> {
    const response = await queryListarConta(usuario);
    return response;
  },
};
