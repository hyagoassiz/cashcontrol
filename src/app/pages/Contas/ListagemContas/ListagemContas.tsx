import { Button, IconButton, Tooltip } from "@mui/material";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CONTA } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";
import { useListagemContas } from "./hooks/useListagemContas";
import { ModalConta } from "./components/ModalConta/ModalConta";
import Filter from "./components/Filter/Filter";
import Dialog from "./components/Dialog/Dialog";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";
import { TitlePage } from "../../../shared/components/TitlePage/TitlePage";
import FilterListIcon from "@mui/icons-material/FilterList";

export const ListagemContas: React.FC = () => {
  const {
    isLoading,
    contas,
    handleEditarConta,
    handleModalConta,
    setToggleFilter,
    setToggleSearchBar,
    toggleSearchBar,
    textFilter,
    setTextFilter,
    handleEditarSituacao,
  } = useListagemContas();

  return (
    <>
      <TitlePage
        title="Contas"
        subTitle="Crie contas para vincular realizar movimentações"
      />
      <ToolPainel
        icons={
          <Tooltip title="Filtrar" placement="top">
            <IconButton onClick={() => setToggleFilter(true)}>
              <FilterListIcon color="info" />
            </IconButton>
          </Tooltip>
        }
        buttons={
          <>
            <Button
              onClick={handleModalConta}
              color="primary"
              variant="contained"
              startIcon={<Add />}
            >
              Adicionar
            </Button>
          </>
        }
        searchBar={{
          open: toggleSearchBar,
          placeholder: "Buscar conta...",
          value: textFilter,
          onChange: (e) => setTextFilter(e.target.value),
          handleSearchBar: () => setToggleSearchBar(!toggleSearchBar),
          onClickClose: () => setToggleSearchBar(!toggleSearchBar),
        }}
      />
      <MuiTable
        columns={COLLUMS_CONTA}
        textForEmptyData="Nenhuma conta encontrada"
        data={mountData({
          contas,
          editarConta: handleEditarConta,
          handleAtivarInativarConta: handleEditarSituacao,
        })}
        isLoading={isLoading}
      />

      <ModalConta />
      <Dialog />

      <Filter />
    </>
  );
};
