import { ListItemText } from "@mui/material";
import MuiMoreVertIcon from "../../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import { IConta } from "../interfaces";
import MuiSituacao from "../../../../shared/components/MuiSituacao/MuiSituacao";

interface IMountData {
  contas: IConta[];
  editarConta: (conta: IConta) => void;
  handleAtivarInativarConta: (handleAtivarInativarConta: IConta) => void;
}

export function mountData({
  contas,
  editarConta,
  handleAtivarInativarConta
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
      situacao: <MuiSituacao ativo={conta.ativo} />,
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
