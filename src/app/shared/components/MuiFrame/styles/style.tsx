import { Box, styled, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";

export const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: theme.spacing(4),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
}));

export const StyledArrowBackIosIcon = styled(ArrowBackIosIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: theme.spacing(2.3),
  color: theme.palette.primary.contrastText,
}));

export const StyledHomeIcon = styled(HomeIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingRight: theme.spacing(0.5),
  height: theme.spacing(2.5),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));
