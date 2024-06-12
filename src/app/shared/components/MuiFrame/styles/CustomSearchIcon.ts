import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';

const CustomSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export default CustomSearchIcon;
