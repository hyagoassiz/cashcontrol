import {
  Divider,
  FormControlLabel,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.text.disabled,
  width: "100%",
  height: "1px",
  marginTop: "20px",
}));
