import { BoxContainer } from "../../../shared/components/BoxContainer/BoxContainer";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { useListagem } from "./hooks/useListagem";

export const Listagem: React.FC = () => {
  const { handleNavigate } = useListagem();
  return (
    <>
      <BoxContainer>
        <MuiFrame title="Saldos" handleBack={handleNavigate} />
        <ToolPainel title={`Resultados (2)`} />
      </BoxContainer>
    </>
  );
};
