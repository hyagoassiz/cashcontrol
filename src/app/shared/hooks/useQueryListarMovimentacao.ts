import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IMovimentacao } from "../interfaces";
import { MovimentacaoService } from "../services/movimentacaoService";

export const KEY_LISTAR_MOVIMENTACAO = "key-listar-movimentacao" as const;

// type Params = Omit<QueryOptions, "queryKey" | "queryFn">;

interface IConfiguracaoFilter {
  id: string;
}

export const useQueryListarMovimentacao = (
  // { ...rest }: Params = {},
  payload: IConfiguracaoFilter
): UseQueryResult<IMovimentacao[] | undefined> => {
  return useQuery({
    queryKey: [KEY_LISTAR_MOVIMENTACAO, payload],
    queryFn: () => MovimentacaoService.fetchMovimentacao(payload.id),
    // ...rest,
  });
};
