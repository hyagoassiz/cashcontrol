export interface IConta {
    id?: string
    usuario: string
    nome: string
    tipoConta: "Conta Corrente" | "Poupança" | "Investimentos" | "Outros" 
    incluirSoma: boolean
    agencia?: string
    conta?: string
    observacao?: string
    ativo: boolean
}
