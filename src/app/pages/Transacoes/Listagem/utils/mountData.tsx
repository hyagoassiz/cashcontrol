import { NumericFormat } from "react-number-format";
import MuiMoreVertIcon from "../../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import MuiSituacao from "../../../../shared/components/MuiSituacao/MuiSituacao";
import MuiTipo from "../../../../shared/components/MuiTipo/MuiTipo";
import { SituacaoColors } from "../../../../shared/constants";
import { formatDate } from "../../../../shared/utils/formatDate";
import { Typography } from "@mui/material";
import { ITransacao } from "../../../../shared/interfaces";

interface IMountData {
  transacoes: ITransacao[] | undefined;
  editarTransacao: (data: ITransacao) => void;
  excluirTransacao: (data: ITransacao) => void;
}

export function mountData({
  transacoes,
  editarTransacao,
  excluirTransacao,
}: IMountData) {
  if (transacoes?.length) {
    transacoes.sort((a, b) => a.data.localeCompare(b.data));

    return transacoes.map((transacao) => ({
      id: transacao.id,
      data: formatDate(transacao.data),
      tipo: <MuiTipo tipo={transacao.tipo} />,
      categoria: transacao.categoria,
      conta: transacao.conta,
      valor: (
        <Typography variant="body2">
          <NumericFormat
            value={transacao.valor}
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
            transacao.tipo === "Entrada"
              ? transacao.pago
                ? "Recebido"
                : "À Receber"
              : transacao.pago
              ? "Pago"
              : "À Pagar"
          }
          situacao={
            transacao.pago
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
              action: () => editarTransacao(transacao),
            },
            {
              label: "Excluir",
              action: () => excluirTransacao(transacao),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
