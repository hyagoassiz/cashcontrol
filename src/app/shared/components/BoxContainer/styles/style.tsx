import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  height: "auto",
  width: "1000px",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
  marginTop: "16px",
  marginBottom: "32px",
  backgroundColor: theme.palette.primary.dark,
}));
