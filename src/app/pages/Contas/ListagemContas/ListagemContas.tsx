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

export const ListagemContas: React.FC = () => {
  const {
    isOpenSearchBar,
    textFilter,
    setTextFilter,
    setIsOpenFilter,
    setIsOpenSearchBar,
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
  } = useListagemContas();

  console.log(conta)

  return (
    <>
      <MuiAppBar />

      <Container>
        <MuiFrame
          title="Contas"
          searchBar={{
            open: isOpenSearchBar,
            placeholder: "Buscar conta...",
            value: textFilter,
            onChange: (e) => setTextFilter(e.target.value),
            handleSearchBar: () => setIsOpenSearchBar(!isOpenSearchBar),
            onClickClose: () => setIsOpenSearchBar(!isOpenSearchBar),
            handleFilter: () => setIsOpenFilter(true),
            handleBack: () => setIsOpenFilter(true),
          }}
        >
          <MuiTable
            columns={COLLUMS_CONTA}
            data={mountData({
              contas,
              showConta: handleShowConta,
              // openModal: setIsOpenDialog,
              // handleActivateDeactivate: setActivateDeactivateData,
            })}
            isLoading={isLoading}
          />
        </MuiFrame>

        <MuiAddButton title="Adicionar Conta" onClick={handleModalConta} />

        <ModalConta
          isOpen={toggleModalConta}
          onClose={handleModalConta}
          data={conta}
          modeShowConta={modeShowConta}
          onEdit={handleEditarConta}
        />

        {/* <Dialog /> */}

        {/* <Filter /> */}
      </Container>
    </>
  );
};
