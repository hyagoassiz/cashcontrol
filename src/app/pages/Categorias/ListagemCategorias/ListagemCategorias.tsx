import { Button } from "@mui/material";
import { MuiAppBar } from "../../../shared/components/MuiAppBar/AppBar";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { useContext } from "react";
import { ModalCategoria } from "../components/ModalCategoria/ModalCategoria";
import { useListagemCategorias } from "../hooks/useListagemCategorias";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CATEGORIA } from "../utils/collumnsNames";
import { mountData } from "../utils/mountData";
import Filter from "../components/Filter/Filter";
import { ListagemCategoriasContext } from "../contexts";
import Dialog from "../components/Dialog/Dialog";
import { BoxContainer } from "../../../shared/components/BoxContainer/BoxContainer";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";

export const ListagemCategorias: React.FC = () => {
  const {
    setIsOpenFilter,
    setIsOpenDialog,
    setActivateDeactivateData,
    textFilter,
    setTextFilter,
    setIsOpenSearchBar,
    isOpenSearchBar,
  } = useContext(ListagemCategoriasContext);

  const {
    categorias,
    categoria,
    modeEditCategoria,
    modeShowCategoria,
    isLoading,
    handleShowCategoria,
    handleModalCategoria,
    handleEditarCategoria2,
    toggleModalCategoria,
    handleNavigate,
  } = useListagemCategorias();

  return (
    <>
      <MuiAppBar />

      <BoxContainer>
        <MuiFrame title="Categorias" handleBack={handleNavigate} />
        <ToolPainel
          title={`Quantidade (${categorias?.length})`}
          buttons={
            <>
              <Button
                onClick={handleModalCategoria}
                variant="text"
                startIcon={<Add />}
              >
                Adicionar
              </Button>
            </>
          }
          searchBar={{
            open: isOpenSearchBar,
            placeholder: "Buscar categorias...",
            value: textFilter,
            onChange: (e) => setTextFilter(e.target.value),
            handleSearchBar: () => setIsOpenSearchBar(!isOpenSearchBar),
            onClickClose: () => setIsOpenSearchBar(!isOpenSearchBar),
            handleFilter: () => setIsOpenFilter(true),
          }}
        />
        <MuiTable
          columns={COLLUMS_CATEGORIA}
          textForEmptyData="Nenhuma categoria encontrada"
          data={mountData({
            categorias,
            openModal: setIsOpenDialog,
            handleActivateDeactivate: setActivateDeactivateData,
            showCategoria: handleShowCategoria,
          })}
          isLoading={isLoading}
        />

        {toggleModalCategoria && (
          <ModalCategoria
            isOpen={toggleModalCategoria}
            onClose={handleModalCategoria}
            data={categoria}
            modeEditCategoria={modeEditCategoria}
            modeShowCategoria={modeShowCategoria}
            onEdit={handleEditarCategoria2}
          />
        )}

        <Dialog />

        <Filter />
      </BoxContainer>
    </>
  );
};
