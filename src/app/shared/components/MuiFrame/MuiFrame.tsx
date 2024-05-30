import {
  Divider,
  IconButton,
  Link,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Container, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactNode } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

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
  onClickClose: () => void;
  handleSearchBar: () => void;
  handleFilter: () => void;
  handleBack: () => void;
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
          width: "100%",
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
              <HomeIcon
                sx={{
                  color: "white",
                  paddingRight: theme.spacing(0.1),
                  height: theme.spacing(2),
                }}
              />
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: "white",
                  paddingRight: theme.spacing(0.5),
                  fontSize: theme.spacing(1.5),
                }}
              >
                Controle Financeiro
              </Link>
              <Typography
                sx={{
                  color: "white",
                  paddingRight: theme.spacing(0.5),
                  fontSize: theme.spacing(1.5),
                }}
              >
                /
              </Typography>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: "white",
                  paddingRight: theme.spacing(0.5),
                  fontSize: theme.spacing(1.5),
                }}
              >
                {title}
              </Link>
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
          {!searchBar?.open && (
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
        <Box
          sx={{
            padding: theme.spacing(1),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Tooltip title="Voltar" placement="top">
            <IconButton onClick={searchBar?.handleBack}>
              <ArrowBackIosIcon
                sx={{
                  cursor: "pointer",
                  fontSize: theme.spacing(2.3),
                }}
              />
            </IconButton>
          </Tooltip>
          <Typography variant="h5">{title}</Typography>
        </Box>

        <Divider sx={{ borderBottomWidth: theme.spacing(0.5) }} />

        <Box sx={{ padding: theme.spacing(1) }}>{children}</Box>
      </Container>
    </>
  );
};
