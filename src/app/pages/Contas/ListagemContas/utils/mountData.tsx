import { ListItemText } from "@mui/material";
import MuiMoreVertIcon from "../../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import { IConta } from "../interfaces";
import MuiSituacao from "../../../../shared/components/MuiSituacao/MuiSituacao";
import { SituacaoColors } from "../../../../shared/constants";

interface IMountData {
  contas: IConta[] | undefined;
  editarConta: (conta: IConta) => void;
  handleAtivarInativarConta: (handleAtivarInativarConta: IConta) => void;
}

export function mountData({
  contas,
  editarConta,
  handleAtivarInativarConta,
}: // openModal,
// handleActivateDeactivate,
IMountData) {
  if (contas?.length) {
    contas.sort((a, b) => a.nome.localeCompare(b.nome));

    return contas.map((conta) => ({
      id: conta.id,
      nome: (
        <ListItemText
          primary={conta.nome}
          secondary={
            conta.agencia && conta.conta
              ? `Agência ${conta.agencia} / Conta ${conta.conta}`
              : ""
          }
        />
      ),
      tipoConta: conta.tipoConta,
      soma: conta.incluirSoma ? "Sim" : "Não",
      situacao: (
        <MuiSituacao
          title={conta.ativo ? "Ativo" : "Inativo"}
          situacao={
            conta.ativo ? SituacaoColors.ativo : SituacaoColors.inativo_pendente
          }
        />
      ),
      options: (
        <MuiMoreVertIcon
          options={[
            {
              label: conta.ativo === true ? "Inativar" : "Ativar",
              action: () => handleAtivarInativarConta(conta),
            },
            {
              label: "Editar",
              action: () => editarConta(conta),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
