import { Container } from "@mui/material";
import MuiAddButton from "../../../shared/components/MuiAddButton/MuiAddButton";
import { MuiAppBar } from "../../../shared/components/MuiAppBar/AppBar";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { useContext, useState } from "react";
import { ModalCategoria } from "../components/ModalCategoria/ModalCategoria";
import { useListagemCategorias } from "../hooks/useListagemCategorias";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CATEGORIA } from "../utils/collumnsNames";
import { mountData } from "../utils/mountData";
import { MuiCircularProgress } from "../../../shared/components/MuiCircularProgress/MuiCircularProgress";
import Filter from "../components/Filter/Filter";
import { FilterContext } from "../contexts/filterContext";
import Dialog from "../components/Dialog/Dialog";

export const ListagemCategorias: React.FC = () => {
  const {
    setIsOpenFilter,
    setIsOpenDialog,
    setActivateDeactivateData,
    setIsOpenAddModalCategoria,
    isOpenAddModalCategoria,
  } = useContext(FilterContext);

  const { categorias, setTextFilter, textFilter, isLoading } =
    useListagemCategorias();

  const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);

  const handleSearchBar = () => {
    setIsOpenSearchBar(!isOpenSearchBar);
  };

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
            handleSearchBar: handleSearchBar,
            onClickClose: handleSearchBar,
            handleFilter: () => setIsOpenFilter(true),
            handleBack: () => setIsOpenFilter(true),
          }}
        >
          {isLoading ? (
            <MuiCircularProgress />
          ) : (
            <MuiTable
              columns={COLLUMS_CATEGORIA}
              data={mountData({
                categorias,
                openModal: setIsOpenDialog,
                handleActivateDeactivate: setActivateDeactivateData,
              })}
            />
          )}
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
