import { Box, Typography } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

interface IMuiSituacao {
  ativo: boolean;
}

const MuiSituacao: React.FC<IMuiSituacao> = ({ ativo }) => {
  return (
    <>
      {ativo ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PowerSettingsNewIcon sx={{ color: "dodgerblue", height: "16px" }} />
          <Typography variant="body2" sx={{ color: "dodgerblue" }}>
            Ativo
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PowerSettingsNewIcon sx={{ color: "orange", height: "16px" }} />
          <Typography variant="body2" sx={{ color: "orange" }}>
            Inativo
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MuiSituacao;
