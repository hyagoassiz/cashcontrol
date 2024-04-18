import {
  Container,
  Pagination,
  PaginationItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import { ITableColumn } from "./interfaces/ITableCollum";
import { Link, useLocation } from "react-router-dom";

interface IMuiTable {
  columns: ITableColumn[];
  data: [];
}

export const MuiTable: React.FC<IMuiTable> = ({ columns, data }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const theme = useTheme();
  return (
    <>
      <Table>
        <TableHead sx={{ height: theme.spacing(3) }} >
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={{fontWeight: 600}} key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>{row[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Container sx={{display: 'flex', alignItems:'center', justifyContent: 'center', padding: '20px'}}>
        <Pagination
          page={page}
          count={10}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Container>
    </>
  );
};
