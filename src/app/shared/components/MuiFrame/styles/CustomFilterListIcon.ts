import FilterListIcon from "@mui/icons-material/FilterList";

import { styled } from '@mui/material/styles';

const CustomFilterListIcon = styled(FilterListIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export default CustomFilterListIcon;
