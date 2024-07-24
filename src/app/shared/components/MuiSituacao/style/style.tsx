import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const MuiSituacaoContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
}));

export const StyledBox = styled(Box)(() => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
}));
