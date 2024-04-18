export interface ICategoria {
    id: string;
    usuario: string;
    nome: string;
    tipo: "Entrada" | "Saída";
    ativo: boolean;

    
}