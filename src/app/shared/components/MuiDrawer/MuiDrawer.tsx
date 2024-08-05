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
import { HeaderBox, StyledBox } from "./style/style";

interface IMuiDrawer {
  open: boolean;
  children: ReactNode;
  closeFilter: () => void;
  applyFilter: () => void;
}

const MuiDrawer = ({
  open,
  children,
  closeFilter,
  applyFilter,
}: IMuiDrawer) => {
  const theme = useTheme();
  return (
    <Drawer open={open} anchor="right">
      <StyledBox>
        <HeaderBox>
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
              <Button
                color="secondary"
                variant="contained"
                onClick={applyFilter}
              >
                Aplicar
              </Button>
            </Box>
          </Box>
        </HeaderBox>
        <Box sx={{ margin: theme.spacing(2) }}>{children}</Box>
      </StyledBox>
    </Drawer>
  );
};

export default MuiDrawer;
