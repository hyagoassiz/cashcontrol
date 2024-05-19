import { Container } from "@mui/material";
import MuiAddButton from "../../../shared/components/MuiAddButton/MuiAddButton";
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

export const ListagemCategorias: React.FC = () => {
  const {
    setIsOpenFilter,
    setIsOpenDialog,
    setActivateDeactivateData,
    setIsOpenAddModalCategoria,
    isOpenAddModalCategoria,
    textFilter,
    setTextFilter,
    setIsOpenSearchBar,
    isOpenSearchBar,
  } = useContext(ListagemCategoriasContext);
  
  const { categorias, isLoading } = useListagemCategorias();

  return (
    <>
      <MuiAppBar />

      <Container>
        <MuiFrame
          title="Categorias"
          searchBar={{
            open: isOpenSearchBar,
            placeholder: "Buscar categorias...",
            value: textFilter,
            onChange: (e) => setTextFilter(e.target.value),
            handleSearchBar: ()=> setIsOpenSearchBar(!isOpenSearchBar),
            onClickClose: ()=> setIsOpenSearchBar(!isOpenSearchBar),
            handleFilter: () => setIsOpenFilter(true),
            handleBack: () => setIsOpenFilter(true),
          }}
        >
          <MuiTable
            columns={COLLUMS_CATEGORIA}
            data={mountData({
              categorias,
              openModal: setIsOpenDialog,
              handleActivateDeactivate: setActivateDeactivateData,
            })}
            isLoading={isLoading}
          />
        </MuiFrame>

        <MuiAddButton
          title="Adicionar Categoria"
          onClick={() => setIsOpenAddModalCategoria(true)}
        />

        <ModalCategoria isOpen={isOpenAddModalCategoria} />

        <Dialog />

        <Filter />
      </Container>
    </>
  );
};
