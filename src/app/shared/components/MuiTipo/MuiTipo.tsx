import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface IMuiTipo {
  tipo: "Entrada" | "Saída" | null;
}

const MuiTipo: React.FC<IMuiTipo> = ({ tipo }) => {
  return (
    <>
      {tipo === "Entrada" ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowDropUpIcon sx={{ color: "limegreen", height: "24px" }} />
          <Typography variant="body2" sx={{ color: "limegreen" }}>
            Entrada
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowDropDownIcon sx={{ color: "crimson", height: "24px" }} />
          <Typography variant="body2" sx={{ color: "crimson" }}>
            Saída
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MuiTipo;
