import { IconButton, Tooltip } from "@mui/material";
import { MuiTable } from "../../../shared/components/MuiTable/MuiTable";
import { TitlePage } from "../../../shared/components/TitlePage/TitlePage";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { useListagem } from "./hooks/useListagem";
import { COLLUMS_SALDO } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";
import FilterListIcon from "@mui/icons-material/FilterList";

export const Listagem: React.FC = () => {
  const { saldos, isFetchingMovimentacoes } = useListagem();

  return (
    <>
      <TitlePage
        title="Saldos"
        subTitle="Consulte aqui o saldo de suas contas"
      />
      <ToolPainel
        icons={
          <Tooltip title="Filtrar" placement="top">
            <IconButton onClick={() => console.log("clicou")}>
              <FilterListIcon color="info" />
            </IconButton>
          </Tooltip>
        }
      />
      <MuiTable
        columns={COLLUMS_SALDO}
        data={mountData({ saldos })}
        isLoading={isFetchingMovimentacoes}
        textForEmptyData="Sem resultado"
      />
    </>
  );
};
