import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledContainer = styled(Box)(() => ({
  height: "auto",
  padding: 0,
  width: "400px",
}));

export const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: theme.spacing(4),
  padding: theme.spacing(1),
}));
