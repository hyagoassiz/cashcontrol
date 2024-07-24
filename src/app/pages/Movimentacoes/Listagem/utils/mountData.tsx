import MuiMoreVertIcon from "../../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import MuiSituacao from "../../../../shared/components/MuiSituacao/MuiSituacao";
import MuiTipo from "../../../../shared/components/MuiTipo/MuiTipo";
import { SituacaoColors } from "../../../../shared/constants";
import { IMovimentacao } from "../interfaces";

interface IMountData {
  movimentacoes: IMovimentacao[] | undefined;
  editarMovimentacao: (data: IMovimentacao) => void;
  excluirMovimentacao: (data: IMovimentacao) => void;
}

export function mountData({
  movimentacoes,
  editarMovimentacao,
  excluirMovimentacao,
}: IMountData) {
  if (movimentacoes?.length) {
    movimentacoes.sort((a, b) => a.data.localeCompare(b.data));

    return movimentacoes.map((movimentacao) => ({
      id: movimentacao.id,
      data: movimentacao.data,
      tipo: <MuiTipo tipo={movimentacao.tipo} />,
      categoria: movimentacao.categoria,
      conta: movimentacao.conta,
      valor: movimentacao.valor,
      situacao: (
        <MuiSituacao
          title={
            movimentacao.tipo === "Entrada"
              ? movimentacao.pago
                ? "Recebido"
                : "À Receber"
              : movimentacao.pago
              ? "Pago"
              : "À Pagar"
          }
          situacao={
            movimentacao.pago
              ? SituacaoColors.pago
              : SituacaoColors.inativo_pendente
          }
        />
      ),

      options: (
        <MuiMoreVertIcon
          options={[
            {
              label: "Excluir",
              action: () => excluirMovimentacao(movimentacao),
            },
            {
              label: "Editar",
              action: () => editarMovimentacao(movimentacao),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
