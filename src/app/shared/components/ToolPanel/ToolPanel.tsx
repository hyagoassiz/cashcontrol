import { Divider, IconButton, Tooltip, useTheme } from "@mui/material";
import { Container, Box, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../SearchBar/SearchBar";
import { ReactNode } from "react";

interface MuiFrameProps {
  title: string;
  buttons?: ReactNode;
  searchBar?: ISearchBar;
}

interface ISearchBar {
  open: boolean;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickClose: () => void;
  handleSearchBar: () => void;
  handleFilter: () => void;
}

export const ToolPainel: React.FC<MuiFrameProps> = ({
  title,
  buttons,
  searchBar,
}) => {
  const theme = useTheme();
  return (
    <>
      <Container
        style={{
          height: "auto",
          width: "1000px",
          padding: 0,
          marginBottom: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: theme.spacing(4),
            padding: theme.spacing(1),
          }}
        >
          {!searchBar?.open ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderRightWidth: "3px",
                }}
              />
              {buttons}
            </Box>
          ) : (
            <SearchBar
              onClickClose={searchBar.onClickClose}
              placeholder={searchBar.placeholder}
              value={searchBar.value}
              onChange={searchBar.onChange}
            />
          )}
          <Box sx={{ flexGrow: 1 }} />
          {!searchBar?.open && searchBar && (
            <Box sx={{ display: "flex" }}>
              <Tooltip title="Pesquisar" placement="top">
                <IconButton onClick={searchBar?.handleSearchBar}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filtrar" placement="top">
                <IconButton onClick={searchBar?.handleFilter}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        <Divider sx={{ borderBottomWidth: "2px" }} />
      </Container>
    </>
  );
};
