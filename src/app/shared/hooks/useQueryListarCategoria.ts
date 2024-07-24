import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ICategoria } from "../interfaces";
import { CategoriaService } from "../services/categoriaService";

export const KEY_LISTAR_CATEGORIA = "key-listar-categoria" as const;

// type Params = Omit<QueryOptions, "queryKey" | "queryFn">;

interface IConfiguracaoFilter {
  id: string;
}

export const useQueryListarCategoria = (
  // { ...rest }: Params = {},
  payload: IConfiguracaoFilter
): UseQueryResult<ICategoria[] | undefined> => {
  return useQuery({
    queryKey: [KEY_LISTAR_CATEGORIA, payload],
    queryFn: () => CategoriaService.fetchCategoria(payload.id),
    // ...rest,
  });
};
