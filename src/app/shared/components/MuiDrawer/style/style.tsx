import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const HeaderBox = styled(Box)(({ theme }) => ({
  height: theme.spacing(7),
  backgroundColor: theme.palette.primary.dark,
  display: "flex",
  alignItems: "center",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: theme.spacing(45),
  height: "100vw",
  backgroundColor: theme.palette.primary.main,
}));
