import { styled } from '@mui/material/styles';
import { Container } from "@mui/material";

const CustomContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export default CustomContainer;
