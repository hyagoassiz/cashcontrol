import {
  Box,
  LinearProgress,
  TableBody,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import { ITableColumn } from "./interfaces/ITableCollum";
import InfoIcon from "@mui/icons-material/Info";
import {
  StyledTableCellBody,
  StyledTableCellHead,
  StyledTableHead,
} from "./styles/style";

interface IMuiTable {
  columns: ITableColumn[];
  data: any[];
  isLoading: boolean;
  textForEmptyData: string;
}

export const MuiTable: React.FC<IMuiTable> = ({
  columns,
  data,
  isLoading,
  textForEmptyData,
}) => {
  const theme = useTheme();
  return (
    <>
      <Table size="small">
        <StyledTableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCellHead size="small" key={column.key}>
                {column.label}
              </StyledTableCellHead>
            ))}
          </TableRow>
        </StyledTableHead>

        {data.length ? (
          <TableBody>
            <>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <StyledTableCellBody
                      size="small"
                      key={column.key}
                      style={{ ...column?.style }}
                    >
                      {row[column.key]}
                    </StyledTableCellBody>
                  ))}
                </TableRow>
              ))}
            </>
          </TableBody>
        ) : (
          <>
            {isLoading ? (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <LinearProgress />
              </Box>
            ) : (
              <TableBody>
                <TableRow>
                  <StyledTableCellBody colSpan={columns.length}>
                    <Box
                      sx={{
                        width: "100%",
                        padding: theme.spacing(1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <InfoIcon
                        sx={{
                          color: "orange",
                          marginRight: theme.spacing(0.5),
                        }}
                      />
                      <Typography color="secondary" variant="body2">
                        {textForEmptyData}
                      </Typography>
                    </Box>
                  </StyledTableCellBody>
                </TableRow>
              </TableBody>
            )}
          </>
        )}
      </Table>
    </>
  );
};
