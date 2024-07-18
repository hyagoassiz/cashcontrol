import { Container } from "@mui/material";
import MuiAddButton from "../../../shared/components/MuiAddButton/MuiAddButton";
import { MuiAppBar } from "../../../shared/components/MuiAppBar/AppBar";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { useContext } from "react";
import { ListagemContasContext } from "../contexts";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CONTA } from "../utils/collumnsNames";
import { mountData } from "../utils/mountData";
import { useListagemContas } from "../hooks/useListagemContas";
import { ModalConta } from "../components/ModalConta/ModalConta";
import Filter from "../components/Filter/Filter";
import Dialog from "../components/Dialog/Dialog";

export const ListagemContas: React.FC = () => {
  const {
    isOpenSearchBar,
    textFilter,
    setTextFilter,
    setIsOpenFilter,
    setIsOpenSearchBar,
    setAtivarInativarContaData,
  } = useContext(ListagemContasContext);

  const {
    isLoading,
    contas,
    conta,
    handleShowConta,
    toggleModalConta,
    handleModalConta,
    modeShowConta,
    handleEditarConta,
    modeEditConta,
    handleNavigate,
  } = useListagemContas();

  return (
    <>
      <MuiAppBar />

      <Container>
        <MuiFrame
          title="Contas"
          handleBack={handleNavigate}
          searchBar={{
            open: isOpenSearchBar,
            placeholder: "Buscar conta...",
            value: textFilter,
            onChange: (e) => setTextFilter(e.target.value),
            handleSearchBar: () => setIsOpenSearchBar(!isOpenSearchBar),
            onClickClose: () => setIsOpenSearchBar(!isOpenSearchBar),
            handleFilter: () => setIsOpenFilter(true),
          }}
        >
          {contas && (
            <MuiTable
              columns={COLLUMS_CONTA}
              textForEmptyData="Nenhuma conta encontrada"
              data={mountData({
                contas,
                showConta: handleShowConta,
                handleAtivarInativarConta: setAtivarInativarContaData,
                // openModal: setIsOpenDialog,
              })}
              isLoading={isLoading}
            />
          )}
        </MuiFrame>

        <MuiAddButton
          tooltip="Adicionar Conta"
          title="NOVA"
          onClick={handleModalConta}
        />

        {toggleModalConta && (
          <ModalConta
            isOpen={toggleModalConta}
            onClose={handleModalConta}
            data={conta}
            modeShowConta={modeShowConta}
            modeEditConta={modeEditConta}
            onEdit={handleEditarConta}
          />
        )}

        <Dialog />

        <Filter />
      </Container>
    </>
  );
};
