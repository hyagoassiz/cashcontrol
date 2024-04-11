export interface ICategoria {
    nome: string;
    tipo: "Entrada" | "Saída";
    status?: "Ativo" | "Inativo"
    
}