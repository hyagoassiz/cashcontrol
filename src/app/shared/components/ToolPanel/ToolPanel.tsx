import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../SearchBar/SearchBar";
import { ReactElement, ReactNode } from "react";
import { BoxContainer, StyledContainer } from "./styles/style";

interface MuiFrameProps {
  buttons?: ReactNode;
  searchBar?: ISearchBar;
  icons: ReactElement;
}

interface ISearchBar {
  open: boolean;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickClose: () => void;
  handleSearchBar: () => void;
}

export const ToolPainel: React.FC<MuiFrameProps> = ({
  buttons,
  searchBar,
  icons,
}) => {
  return (
    <>
      <StyledContainer>
        <BoxContainer
          sx={{ justifyContent: buttons ? "space-between" : "none" }}
        >
          {!searchBar?.open ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
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
          <Box />
          {!searchBar?.open && (
            <Box sx={{ display: "flex" }}>
              {!searchBar ? (
                <>{icons}</>
              ) : (
                <>
                  <Tooltip title="Pesquisar" placement="top">
                    <IconButton onClick={searchBar?.handleSearchBar}>
                      <SearchIcon color="info" />
                    </IconButton>
                  </Tooltip>
                  {icons}
                </>
              )}
            </Box>
          )}
        </BoxContainer>
      </StyledContainer>
    </>
  );
};
