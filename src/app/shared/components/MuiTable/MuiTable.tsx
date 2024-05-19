import {
  Box,
  // Container,
  LinearProgress,
  // Pagination,
  // PaginationItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import { ITableColumn } from "./interfaces/ITableCollum";
// import {  useLocation } from "react-router-dom";

interface IMuiTable {
  columns: ITableColumn[];
  data: [];
  isLoading?: boolean;
}

export const MuiTable: React.FC<IMuiTable> = ({ columns, data, isLoading }) => {
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const page = parseInt(query.get("page") || "1", 10);
  const theme = useTheme();
  return (
    <>
      <Table size="small">
        <TableHead sx={{ height: theme.spacing(3) }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell size="small" sx={{ fontWeight: 600 }} key={column.key}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell size="small" key={column.key}>
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && (
        <Box
          sx={{
            width: "100%",
          }}
        >
          <LinearProgress />
        </Box>
      )}

      {/* <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
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
      </Container> */}
    </>
  );
};
