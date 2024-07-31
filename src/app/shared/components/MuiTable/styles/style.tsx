import { styled, TableCell, TableHead } from "@mui/material";

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  height: theme.spacing(5),
  backgroundColor: theme.palette.secondary.main,
}));

export const StyledTableCellHead = styled(TableCell)(() => ({
  fontWeight: 600,
  borderBottom: `none`,
}));

export const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.primary.main,
}));
