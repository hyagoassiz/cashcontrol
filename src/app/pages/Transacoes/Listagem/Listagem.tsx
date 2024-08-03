import { Button, IconButton, Tooltip } from "@mui/material";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { ModalTransacoes } from "./components/ModalTransacoes/ModalTransacoes";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { mountData } from "./utils/mountData";
import { COLLUMS_TRANSACAO } from "./utils/collumnsNames";
import ModalExcluir from "./components/ModalExcluir/ModalExcluir";
import { TitlePage } from "../../../shared/components/TitlePage/TitlePage";
import FilterListIcon from "@mui/icons-material/FilterList";

export const Listagem: React.FC = () => {
  const {
    handleModalTransacoes,
    transacoes,
    isFetchingTransacoes,
    handleEditarTransacao,
    handleExcluirTransacao,
  } = useListagem();

  return (
    <>
      <TitlePage title="Transações" subTitle="Registe suas entradas e saídas" />

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
              onClick={handleModalTransacoes}
              startIcon={<Add />}
            >
              Adicionar
            </Button>
          </>
        }
      />
      <MuiTable
        columns={COLLUMS_TRANSACAO}
        isLoading={isFetchingTransacoes}
        textForEmptyData="Nenhum resultado encontrado"
        data={mountData({
          transacoes,
          editarTransacao: handleEditarTransacao,
          excluirTransacao: handleExcluirTransacao,
        })}
      />
      <ModalTransacoes />
      <ModalExcluir />
    </>
  );
};
