import { MuiAppBar } from "../../../shared/components/MuiAppBar/AppBar";
import { MuiCardMenu } from "../../../shared/components/MuiCardMenu/MuiCardMenu";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
// import { CardMenu } from "../components/CardMenu";
import { OPTIONS } from "../utils/constants";

export const ListagemMenu: React.FC = () => {
  return (
    <>
      <MuiAppBar />
      {/* <CardMenu /> */}

      <MuiFrame>
        <MuiCardMenu options={OPTIONS} />
      </MuiFrame>
    </>
  );
};
