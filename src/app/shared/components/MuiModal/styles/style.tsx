import { Box, Modal, styled } from "@mui/material";

export const BoxContainer = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1300,
}));

export const StyledModal = styled(Modal)(() => ({
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const BoxTitle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1),
}));

export const InsideColor = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
}));

export const BoxFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.primary.dark,
  padding: theme.spacing(1),
}));
