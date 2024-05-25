import { ICategoria } from "../interfaces";
import MuiMoreVertIcon from "../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";

interface IMountData {
  categorias: ICategoria[];
  openModal: (openModal: boolean) => void;
  handleActivateDeactivate: (handleActivateDeactivate: ICategoria) => void;
  showConta: (showConta: ICategoria) => void;
}

export function mountData({
  categorias,
  openModal,
  handleActivateDeactivate,
  showConta
}: IMountData) {
  if (categorias?.length) {
    categorias.sort((a, b) => a.nome.localeCompare(b.nome));

    return categorias.map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      tipo: categoria.tipo,
      situacao: categoria.ativo === true ? "Ativo" : "Inativo",
      options: (
        <MuiMoreVertIcon
          options={[
            {
              label: categoria.ativo === true ? "Inativar" : "Ativar",
              action: () => {
                openModal(true), handleActivateDeactivate(categoria);
              },
            },
            {
              label: "Visualizar",
              action: () => showConta(categoria),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
