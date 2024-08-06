export interface IFilterData {
  tipo: TipoCategoria[];
  ativo: boolean[];
}

type TipoCategoria = "Entrada" | "Saída";
