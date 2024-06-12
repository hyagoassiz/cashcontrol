import { Divider, IconButton, Tooltip, useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import CustomBox from "./styles/CustomBox";
import CustomContainer from "./styles/CustomContainer";
import CustomArrowBackIosIcon from "./styles/CustomArrowBackIosIcon";
import CustomHomeIcon from "./styles/CustomHomeIcon";
import CustomSearchIcon from "./styles/CustomSearchIcon";
import CustomFilterListIcon from "./styles/CustomFilterListIcon";

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
      <CustomContainer
        style={{
          height: "auto",
          width: "1000px",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          padding: 0,
          marginTop: theme.spacing(3),
        }}
      >
        <CustomBox
          sx={{
            display: "flex",
            alignItems: "center",
            height: theme.spacing(4),
            padding: theme.spacing(1),
          }}
        >
          {!searchBar?.open ? (
            <>
              {handleBack ? (
                <>
                  <Tooltip title="Voltar" placement="top">
                    <IconButton onClick={handleBack}>
                      <CustomArrowBackIosIcon
                        sx={{
                          cursor: "pointer",
                          fontSize: theme.spacing(2.3),
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body1">Voltar</Typography>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CustomHomeIcon
                    sx={{
                      paddingRight: theme.spacing(0.5),
                      height: theme.spacing(2.5),
                    }}
                  />
                  <Typography>Cash Control Project</Typography>
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
                  <CustomSearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filtrar" placement="top">
                <IconButton onClick={searchBar?.handleFilter}>
                  <CustomFilterListIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </CustomBox>
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
      </CustomContainer>
    </>
  );
};
