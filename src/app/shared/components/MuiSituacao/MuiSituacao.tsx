import { Typography } from "@mui/material";
import { MuiSituacaoContainer, StyledBox } from "./style/style";
import { SituacaoColors } from "../../constants";

interface IMuiSituacao {
  title: string;
  situacao: SituacaoColors;
}

const MuiSituacao: React.FC<IMuiSituacao> = ({ title, situacao }) => {
  return (
    <>
      <MuiSituacaoContainer>
        <StyledBox sx={{ backgroundColor: situacao }} />
        <Typography
          variant="subtitle2"
          textTransform="lowercase"
          sx={{ fontStyle: "italic" }}
        >
          {title}
        </Typography>
      </MuiSituacaoContainer>
    </>
  );
};

export default MuiSituacao;
