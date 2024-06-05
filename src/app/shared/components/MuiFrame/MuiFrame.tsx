import { Divider, IconButton, Tooltip, useTheme } from "@mui/material";
import { Container, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactNode } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

interface MuiFrameProps {
  title?: string;
  children: ReactNode;
  searchBar?: ISearchBar;
  handleBack?: () => void;
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

export const MuiFrame: React.FC<MuiFrameProps> = ({
  title,
  children,
  searchBar,
  handleBack,
}) => {
  const theme = useTheme();
  return (
    <>
      <Container
        style={{
          height: "auto",
          width: '1000px',
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          padding: 0,
          marginTop: theme.spacing(3),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: theme.spacing(4),
            padding: theme.spacing(1),
            backgroundColor: "#1976D2",
          }}
        >
          {!searchBar?.open ? (
            <>
              {handleBack ? (
                <>
                  <Tooltip title="Voltar" placement="top">
                    <IconButton onClick={handleBack}>
                      <ArrowBackIosIcon
                        sx={{
                          cursor: "pointer",
                          fontSize: theme.spacing(2.3),
                          color: "white",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    Voltar
                  </Typography>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <HomeIcon
                    sx={{
                      color: "white",
                      paddingRight: theme.spacing(0.5),
                      height: theme.spacing(2.5),
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Cash Control Project
                  </Typography>
                </Box>
              )}
            </>
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
                  <SearchIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filtrar" placement="top">
                <IconButton onClick={searchBar?.handleFilter}>
                  <FilterListIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        {title && (
          <>
            <Box
              sx={{
                padding: theme.spacing(1),
                marginTop: theme.spacing(2),
                marginLeft: theme.spacing(1),
                marginBottom: theme.spacing(2),
              }}
            >
              <Typography variant="h5">{title}</Typography>
            </Box>
            <Divider sx={{ borderBottomWidth: theme.spacing(0.5) }} />
          </>
        )}

        <Box sx={{ padding: theme.spacing(1) }}>{children}</Box>
      </Container>
    </>
  );
};
