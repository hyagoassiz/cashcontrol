import { BoxContainer } from "../../../shared/components/BoxContainer/BoxContainer";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { useListagem } from "./hooks/useListagem";
import { COLLUMS_SALDO } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";

export const Listagem: React.FC = () => {
  const { handleNavigate, saldos, isFetchingMovimentacoes } = useListagem();

  return (
    <>
      <BoxContainer>
        <MuiFrame title="Saldos" handleBack={handleNavigate} />
        <ToolPainel title={`Resultados (${saldos.length})`} />
        <MuiTable
          columns={COLLUMS_SALDO}
          data={mountData({ saldos })}
          isLoading={isFetchingMovimentacoes}
          textForEmptyData="Sem resultado"
        />
      </BoxContainer>
    </>
  );
};
