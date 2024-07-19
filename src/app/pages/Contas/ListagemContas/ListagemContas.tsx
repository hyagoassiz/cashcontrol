import { Container } from "@mui/material";
import MuiAddButton from "../../../shared/components/MuiAddButton/MuiAddButton";
import { MuiAppBar } from "../../../shared/components/MuiAppBar/AppBar";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CONTA } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";
import { useListagemContas } from "./hooks/useListagemContas";
import { ModalConta } from "./components/ModalConta/ModalConta";
import Filter from "./components/Filter/Filter";
import Dialog from "./components/Dialog/Dialog";

export const ListagemContas: React.FC = () => {
  const {
    isLoading,
    contas,
    handleEditarConta,
    handleModalConta,
    handleNavigate,
    setToggleFilter,
    setToggleSearchBar,
    toggleSearchBar,
    textFilter,
    setTextFilter,
    setAtivarInativarContaData,
  } = useListagemContas();

  return (
    <>
      <MuiAppBar />

      <Container>
        <MuiFrame
          title="Contas"
          handleBack={handleNavigate}
          searchBar={{
            open: toggleSearchBar,
            placeholder: "Buscar conta...",
            value: textFilter,
            onChange: (e) => setTextFilter(e.target.value),
            handleSearchBar: () => setToggleSearchBar(!toggleSearchBar),
            onClickClose: () => setToggleSearchBar(!toggleSearchBar),
            handleFilter: () => setToggleFilter(true),
          }}
        >
          {contas && (
            <MuiTable
              columns={COLLUMS_CONTA}
              textForEmptyData="Nenhuma conta encontrada"
              data={mountData({
                contas,
                editarConta: handleEditarConta,
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

        <ModalConta />
        <Dialog />

        <Filter />
      </Container>
    </>
  );
};
