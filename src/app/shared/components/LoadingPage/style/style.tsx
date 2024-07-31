import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const BoxContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
