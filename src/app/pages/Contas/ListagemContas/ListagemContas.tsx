import { Button } from "@mui/material";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CONTA } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";
import { useListagemContas } from "./hooks/useListagemContas";
import { ModalConta } from "./components/ModalConta/ModalConta";
import Filter from "./components/Filter/Filter";
import Dialog from "./components/Dialog/Dialog";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";
import { BoxContainer } from "../../../shared/components/BoxContainer/BoxContainer";

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
    handleEditarSituacao,
  } = useListagemContas();

  return (
    <>
      <BoxContainer>
        <MuiFrame title="Contas" handleBack={handleNavigate} />
        <ToolPainel
          title={`Quantidade (${contas?.length})`}
          buttons={
            <>
              <Button
                onClick={handleModalConta}
                variant="text"
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
            handleFilter: () => setToggleFilter(true),
          }}
        />
        <MuiTable
          columns={COLLUMS_CONTA}
          textForEmptyData="Nenhuma conta encontrada"
          data={mountData({
            contas,
            editarConta: handleEditarConta,
            handleAtivarInativarConta: handleEditarSituacao,
            // openModal: setIsOpenDialog,
          })}
          isLoading={isLoading}
        />

        <ModalConta />
        <Dialog />

        <Filter />
      </BoxContainer>
    </>
  );
};
