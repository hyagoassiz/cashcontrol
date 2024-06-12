import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
}));

export default CustomBox;
