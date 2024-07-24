import {
  Box,
  LinearProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import { ITableColumn } from "./interfaces/ITableCollum";
import InfoIcon from "@mui/icons-material/Info";

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
      {data.length ? (
        <Table size="small">
          <TableHead sx={{ height: theme.spacing(3) }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  size="small"
                  sx={{ fontWeight: 600 }}
                  key={column.key}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            <>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      size="small"
                      key={column.key}
                      style={{ ...column?.style }}
                    >
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          </TableBody>
        </Table>
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
            <Box
              sx={{
                padding: theme.spacing(1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InfoIcon
                sx={{ color: "orange", marginRight: theme.spacing(0.5) }}
              />
              <Typography variant="body2">{textForEmptyData}</Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};
