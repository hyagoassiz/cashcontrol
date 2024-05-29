export interface ICategoria {
  id?: string;
  usuario: string;
  nome: string;
  tipo: "Entrada" | "Saída" | null;
  ativo: boolean;
}
