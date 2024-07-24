import { Button } from "@mui/material";
import { BoxContainer } from "../../../shared/components/BoxContainer/BoxContainer";
import { MuiAppBar } from "../../../shared/components/MuiAppBar/AppBar";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { ModalMovimentacoes } from "./components/ModalMovimentacoes/ModalMovimentacoes";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { mountData } from "./utils/mountData";
import { COLLUMS_MOVIMENTACAO } from "./utils/collumnsNames";
import ModalExcluir from "./components/ModalExcluir/ModalExcluir";

export const Listagem: React.FC = () => {
  const {
    handleNavigate,
    handleModalMovimentacoes,
    movimentacoes,
    isFetchingMovimentacoes,
    handleEditarMovimentacao,
    handleExcluirMovimentacao
  } = useListagem();

  return (
    <>
      <MuiAppBar />
      <BoxContainer>
        <MuiFrame title="Movimentações" handleBack={handleNavigate} />
        <ToolPainel
          title={`Resultados (${movimentacoes?.length})`}
          buttons={
            <>
              <Button
                variant="outlined"
                onClick={() => handleModalMovimentacoes(true)}
                startIcon={<Add />}
                sx={{color: 'green'}}
              >
                Entrada
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleModalMovimentacoes(false)}
                startIcon={<Add />}
                sx={{color: 'red'}}
              >
                Saída
              </Button>
            </>
          }
        />
        <MuiTable
          columns={COLLUMS_MOVIMENTACAO}
          isLoading={isFetchingMovimentacoes}
          textForEmptyData="Nenhum resultado encontrado"
          data={mountData({
            movimentacoes,
            editarMovimentacao: handleEditarMovimentacao,
            excluirMovimentacao: handleExcluirMovimentacao
          })}
        />
      </BoxContainer>
      <ModalMovimentacoes />
      <ModalExcluir/>
    </>
  );
};