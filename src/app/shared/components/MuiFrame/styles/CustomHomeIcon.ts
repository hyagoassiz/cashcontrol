import HomeIcon from "@mui/icons-material/Home";
import { styled } from '@mui/material/styles';

const CustomHomeIcon = styled(HomeIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export default CustomHomeIcon;
