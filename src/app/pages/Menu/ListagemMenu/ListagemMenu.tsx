import { BoxContainer } from "../../../shared/components/BoxContainer/BoxContainer";
import { MuiCardMenu } from "../../../shared/components/MuiCardMenu/MuiCardMenu";
import { MuiFrame } from "../../../shared/components/MuiFrame/MuiFrame";
// import { CardMenu } from "../components/CardMenu";
import { OPTIONS } from "../utils/constants";

export const ListagemMenu: React.FC = () => {
  return (
    <>
      <BoxContainer>
        <MuiFrame />
        <MuiCardMenu options={OPTIONS} />
      </BoxContainer>
    </>
  );
};
