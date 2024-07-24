import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IConta } from "../interfaces";
import { ContaService } from "../services/contaService";

export const KEY_LISTAR_CONTA = "key-listar-conta" as const;

// type Params = Omit<QueryOptions, "queryKey" | "queryFn">;

interface IConfiguracaoFilter {
  id: string;
}

export const useQueryListarConta = (
  // { ...rest }: Params = {},
  payload: IConfiguracaoFilter
): UseQueryResult<IConta[] | undefined> => {
  return useQuery({
    queryKey: [KEY_LISTAR_CONTA, payload],
    queryFn: () => ContaService.fetchConta(payload.id),
    // ...rest,
  });
};
