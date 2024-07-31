import { Divider, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../SearchBar/SearchBar";
import { ReactNode } from "react";
import {
  BoxContainer,
  StyledContainer,
  StyledTypography,
} from "./styles/style";

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
  return (
    <>
      <Divider sx={{ borderBottomWidth: "1px" }} />

      <StyledContainer>
        <BoxContainer>
          {!searchBar?.open ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <StyledTypography variant="body2">{title}</StyledTypography>
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
        </BoxContainer>
      </StyledContainer>
      <Divider sx={{ borderBottomWidth: "1px" }} />
    </>
  );
};
