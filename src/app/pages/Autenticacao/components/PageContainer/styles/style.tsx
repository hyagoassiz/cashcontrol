import { Box, Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/system";

export const BoxMain = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: theme.palette.primary.dark,
}));

export const BoxContainer = styled(Box)(({ theme }) => ({
  alignItems: "center",
  height: "auto",
  minHeight: "400px",
  width: "350px",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
}));

export const TitleStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
}));
