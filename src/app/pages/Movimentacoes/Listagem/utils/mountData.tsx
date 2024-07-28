import { NumericFormat } from "react-number-format";
import MuiMoreVertIcon from "../../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import MuiSituacao from "../../../../shared/components/MuiSituacao/MuiSituacao";
import MuiTipo from "../../../../shared/components/MuiTipo/MuiTipo";
import { SituacaoColors } from "../../../../shared/constants";
import { IMovimentacao } from "../interfaces";
import { formatDate } from "../../../../shared/utils/formatDate";
import { Typography } from "@mui/material";

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
      data: formatDate(movimentacao.data),
      tipo: <MuiTipo tipo={movimentacao.tipo} />,
      categoria: movimentacao.categoria,
      conta: movimentacao.conta,
      valor: (
        <Typography variant="body2">
          <NumericFormat
            value={movimentacao.valor}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator={"."}
            displayType="text"
          />
        </Typography>
      ),
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
              label: "Editar",
              action: () => editarMovimentacao(movimentacao),
            },
            {
              label: "Excluir",
              action: () => excluirMovimentacao(movimentacao),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
