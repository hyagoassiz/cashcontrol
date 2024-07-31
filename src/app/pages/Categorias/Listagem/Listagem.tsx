import { Button } from "@mui/material";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { BoxContainer } from "../../../shared/components/BoxContainer/BoxContainer";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CATEGORIA } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";
import { ModalCategoria } from "./components/ModalCategoria/ModalCategoria";
import ModalSituacao from "./components/ModalSituacao/ModalSituacao";
import Filter from "./components/Filter/Filter";

export const ListagemCategorias: React.FC = () => {
  const {
    categorias,
    isLoading,
    handleEditarCategoria,
    handleModalCategoria,
    handleNavigate,
    handleSearchBar,
    toggleSearchBar,
    textFilter,
    setTextFilter,
    handleEditarSituacao,
    handleToggleFilter,
  } = useListagem();

  return (
    <>
      <BoxContainer>
        <MuiFrame title="Categorias" handleBack={handleNavigate} />
        <ToolPainel
          title={`Quantidade (${categorias?.length})`}
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
            handleFilter: handleToggleFilter,
          }}
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
      </BoxContainer>
    </>
  );
};
