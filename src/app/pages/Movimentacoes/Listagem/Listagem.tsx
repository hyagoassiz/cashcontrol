import { Button, IconButton, Tooltip } from "@mui/material";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { ModalMovimentacoes } from "./components/ModalMovimentacoes/ModalMovimentacoes";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { mountData } from "./utils/mountData";
import { COLLUMS_MOVIMENTACAO } from "./utils/collumnsNames";
import ModalExcluir from "./components/ModalExcluir/ModalExcluir";
import { TitlePage } from "../../../shared/components/TitlePage/TitlePage";
import FilterListIcon from "@mui/icons-material/FilterList";

export const Listagem: React.FC = () => {
  const {
    handleModalMovimentacoes,
    movimentacoes,
    isFetchingMovimentacoes,
    handleEditarMovimentacao,
    handleExcluirMovimentacao,
  } = useListagem();

  return (
    <>
      <TitlePage
        title="Movimentações"
        subTitle="Registe suas entradas e saídas"
      />

      <ToolPainel
        icons={
          <Tooltip title="Filtrar" placement="top">
            <IconButton onClick={() => console.log("clicou")}>
              <FilterListIcon color="info" />
            </IconButton>
          </Tooltip>
        }
        buttons={
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalMovimentacoes}
              startIcon={<Add />}
            >
              Adicionar
            </Button>
          </>
        }
      />
      <MuiTable
        columns={COLLUMS_MOVIMENTACAO}
        isLoading={isFetchingMovimentacoes}
        textForEmptyData="Nenhum resultado encontrado"
        data={mountData({
          movimentacoes,
          editarMovimentacao: handleEditarMovimentacao,
          excluirMovimentacao: handleExcluirMovimentacao,
        })}
      />
      <ModalMovimentacoes />
      <ModalExcluir />
    </>
  );
};
