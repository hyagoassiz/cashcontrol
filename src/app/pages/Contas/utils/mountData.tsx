import { ListItemText } from "@mui/material";
import MuiMoreVertIcon from "../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import { IConta } from "../interfaces";

interface IMountData {
  contas: IConta[];
  showConta: (seeConta: IConta) => void;
  // handleActivateDeactivate: (handleActivateDeactivate: IConta) => void;
}

export function mountData({
  contas,
  showConta,
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
      situacao: conta.ativo === true ? "Ativo" : "Inativo",
      options: (
        <MuiMoreVertIcon
          options={[
            {
              label: "Visualizar",
              action: () => showConta(conta),
            },
            {
              label: "Editar",
              action: () => alert("CLicou"),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
