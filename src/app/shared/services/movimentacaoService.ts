import { IReturnBackEnd, ITransacao } from "../interfaces";
import {
  queryAdicionarMovimentacao,
  queryEditarMovimentacao,
  queryExcluirMovimentacao,
  queryListarMovimentacoes,
} from "../queries/queriesMovimentacao";

export const MovimentacaoService = {
  async fetchMovimentacao(usuario: string): Promise<ITransacao[]> {
    const response = await queryListarMovimentacoes(usuario);
    return response;
  },
  async addMovimentacao(payload: ITransacao): Promise<IReturnBackEnd> {
    const response = await queryAdicionarMovimentacao(payload);
    return response;
  },
  async editMovimentacao(payload: ITransacao): Promise<IReturnBackEnd> {
    const response = await queryEditarMovimentacao(payload);
    return response;
  },
  async deleteMovimentacao(payload: ITransacao): Promise<IReturnBackEnd> {
    const response = await queryExcluirMovimentacao(payload);
    return response;
  },
};
