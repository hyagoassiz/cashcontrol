import {
  Box,
  Button,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ReactNode } from "react";

interface IMuiDrawer {
  open: boolean;
  children: ReactNode
  closeFilter: () => void
  applyFilter: () => void
}

const MuiDrawer = ({ open, children, closeFilter, applyFilter  }: IMuiDrawer) => {
  const theme = useTheme();
  return (
    <Drawer open={open} anchor="right">
      <Box sx={{ width: theme.spacing(45), height: "100vw" }}>
        <Box
          sx={{
            height: theme.spacing(7),
            backgroundColor: "#1976d2",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginLeft: theme.spacing(1),
              marginRight: theme.spacing(1),
            }}
          >
            <Tooltip title="Voltar" placement="bottom" onClick={closeFilter}>
              <IconButton>
                <ArrowBackIosNewIcon
                  sx={{ color: "white", height: theme.spacing(2.3) }}
                />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" sx={{ color: "white" }}>
              Filtrar
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button variant="contained" sx={{ color: "white" }} onClick={applyFilter}>
                Aplicar
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{margin: theme.spacing(2)}}>
          
          {children}
        </Box>
      </Box>
    </Drawer>
  );
};

export default MuiDrawer;
