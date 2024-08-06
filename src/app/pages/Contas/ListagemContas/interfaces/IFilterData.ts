export interface IFilterData {
  ativo: boolean[];
  tipoConta: TipoConta[];
}

type TipoConta = "Conta Corrente" | "Poupança" | "Investimentos" | "Outros";
