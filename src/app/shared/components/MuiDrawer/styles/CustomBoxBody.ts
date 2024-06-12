import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomBoxBody = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export default CustomBoxBody
