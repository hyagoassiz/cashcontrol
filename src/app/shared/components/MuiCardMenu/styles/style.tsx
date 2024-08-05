import { Box, ListItem, styled, Typography } from "@mui/material";

export const BoxContainer = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "250px",
  margin: "10px",
  boxShadow: "0.5px 1px 4px rgba(0, 0, 0, 0.3)",
  backgroundColor: theme.palette.primary.main,
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "16px",
  color: theme.palette.primary.contrastText,
}));

export const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
});

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
