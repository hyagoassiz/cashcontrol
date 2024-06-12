import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled } from '@mui/material/styles';

const CustomArrowBackIosIcon = styled(ArrowBackIosIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export default CustomArrowBackIosIcon;
