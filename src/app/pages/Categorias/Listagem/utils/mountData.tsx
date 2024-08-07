import MuiMoreVertIcon from "../../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import MuiSituacao from "../../../../shared/components/MuiSituacao/MuiSituacao";
import MuiTipo from "../../../../shared/components/MuiTipo/MuiTipo";
import { SituacaoColors } from "../../../../shared/constants";
import { ICategoria } from "../../../../shared/interfaces";

interface IMountData {
  categorias: ICategoria[] | undefined;
  alterarSituacao(data: ICategoria): void;
  editarCategoria(data: ICategoria): void;
}

export function mountData({
  categorias,
  alterarSituacao,
  editarCategoria,
}: IMountData) {
  if (categorias?.length) {
    categorias.sort((a, b) => a.nome.localeCompare(b.nome));

    return categorias.map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      tipo: <MuiTipo tipo={categoria.tipo} />,
      situacao: (
        <MuiSituacao
          title={categoria.ativo ? "Ativo" : "Inativo"}
          situacao={
            categoria.ativo
              ? SituacaoColors.ativo
              : SituacaoColors.inativo_pendente
          }
        />
      ),
      options: (
        <MuiMoreVertIcon
          options={[
            {
              label: categoria.ativo === true ? "Inativar" : "Ativar",
              action: () => alterarSituacao(categoria),
            },
            {
              label: "Editar",
              action: () => editarCategoria(categoria),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
