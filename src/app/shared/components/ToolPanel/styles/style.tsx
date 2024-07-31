import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledContainer = styled(Box)(({ theme }) => ({
  height: "auto",
  width: "1000px",
  padding: 0,
  backgroundColor: theme.palette.primary.dark,
}));

export const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: theme.spacing(4),
  padding: theme.spacing(1),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));
