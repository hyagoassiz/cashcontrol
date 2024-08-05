import { Button, IconButton, Tooltip } from "@mui/material";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CATEGORIA } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";
import { ModalCategoria } from "./components/ModalCategoria/ModalCategoria";
import ModalSituacao from "./components/ModalSituacao/ModalSituacao";
import Filter from "./components/Filter/Filter";
import { TitlePage } from "../../../shared/components/TitlePage/TitlePage";
import FilterListIcon from "@mui/icons-material/FilterList";

export const ListagemCategorias: React.FC = () => {
  const {
    categorias,
    isLoading,
    handleEditarCategoria,
    handleModalCategoria,
    handleSearchBar,
    toggleSearchBar,
    textFilter,
    setTextFilter,
    handleEditarSituacao,
    handleToggleFilter,
  } = useListagem();

  return (
    <>
      <TitlePage
        title="Categorias"
        subTitle="Crie categorias para entradas e saídas"
      />
      <ToolPainel
        buttons={
          <>
            <Button
              onClick={handleModalCategoria}
              variant="contained"
              color="primary"
              startIcon={<Add />}
            >
              Adicionar
            </Button>
          </>
        }
        searchBar={{
          open: toggleSearchBar,
          placeholder: "Buscar categorias...",
          value: textFilter,
          onChange: (e) => setTextFilter(e.target.value),
          handleSearchBar: handleSearchBar,
          onClickClose: handleSearchBar,
        }}
        icons={
          <Tooltip title="Filtrar" placement="top">
            <IconButton onClick={handleToggleFilter}>
              <FilterListIcon color="info" />
            </IconButton>
          </Tooltip>
        }
      />
      <MuiTable
        columns={COLLUMS_CATEGORIA}
        textForEmptyData="Nenhuma categoria encontrada"
        data={mountData({
          categorias,
          alterarSituacao: handleEditarSituacao,
          editarCategoria: handleEditarCategoria,
        })}
        isLoading={isLoading}
      />

      <ModalCategoria />

      <ModalSituacao />

      <Filter />
    </>
  );
};
