import { MoreVert } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const CustomMoreVert = styled(MoreVert)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export default CustomMoreVert;
