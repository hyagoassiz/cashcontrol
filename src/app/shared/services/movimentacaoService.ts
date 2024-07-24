import { IMovimentacao, IReturnBackEnd } from "../interfaces";
import { queryAdicionarMovimentacao, queryEditarMovimentacao, queryExcluirMovimentacao, queryListarMovimentacoes } from "../queries/queriesMovimentacao";

export const MovimentacaoService = {
  async fetchMovimentacao(usuario: string): Promise<IMovimentacao[]> {
    const response = await queryListarMovimentacoes(usuario);
    return response;
  },
  async addMovimentacao(payload: IMovimentacao): Promise<IReturnBackEnd> {
    const response = await queryAdicionarMovimentacao(payload);
    return response;
  },
  async editMovimentacao(payload: IMovimentacao): Promise<IReturnBackEnd> {
    const response = await queryEditarMovimentacao(payload);
    return response;
  },
  async deleteMovimentacao(payload: IMovimentacao): Promise<IReturnBackEnd> {
    const response = await queryExcluirMovimentacao(payload);
    return response;
  },
};
