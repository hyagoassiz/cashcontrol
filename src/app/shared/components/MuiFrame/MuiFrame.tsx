import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Container, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactNode } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

interface MuiFrameProps {
  title: string;
  children: ReactNode;
  searchBar?: ISearchBar;
}

interface ISearchBar {
  open: boolean;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleOpen: () => void;
  onClickClose: () => void;
}

export const MuiFrame: React.FC<MuiFrameProps> = ({
  title,
  children,
  searchBar,
}) => {
  const theme = useTheme();
  return (
    <>
      <Container
        style={{
          height: "auto",
          width: "80%",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          padding: 0,
          marginTop: theme.spacing(3),
        }}
      >
        {!searchBar?.open ? (
          <Box
            width="100%"
            height={theme.spacing(7)}
            bgcolor={"#1976D2"}
            alignItems="center"
            display="flex"
          >
            <Container sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Tooltip title="Voltar" placement="top">
                  <IconButton onClick={searchBar?.toggleOpen}>
                    <ArrowBackIosIcon
                      sx={{
                        color: "white",
                        cursor: "pointer",
                        fontSize: theme.spacing(2.3),
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" color="white">
                  {title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Tooltip title="Pesquisar" placement="top">
                  <IconButton onClick={searchBar?.toggleOpen}>
                    <SearchIcon
                      sx={{ marginRight: theme.spacing(1), color: "white" }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Filtrar" placement="top">
                  <IconButton onClick={searchBar?.toggleOpen}>
                    <FilterListIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Container>
          </Box>
        ) : (
          <SearchBar
            onClickClose={searchBar.onClickClose}
            placeholder={searchBar.placeholder}
            // height="64px"
            value={searchBar.value}
            onChange={searchBar.onChange}
          />
        )}
        <Box sx={{ padding: theme.spacing(1) }}>{children}</Box>
      </Container>
    </>
  );
};
