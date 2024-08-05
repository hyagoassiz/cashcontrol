import { Box, Divider, List, useTheme } from "@mui/material";
import { IOptionsMenu } from "../../interfaces/IOptionsMenu";
import { useNavigate } from "react-router-dom";
import {
  BoxContainer,
  StyledBox,
  StyledListItem,
  StyledTypography,
} from "./styles/style";

interface IMuiCardMenu {
  options: IOptionsMenu[];
}

export const MuiCardMenu = ({ options }: IMuiCardMenu) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      {options.map((option) => (
        <BoxContainer>
          <StyledBox>
            <StyledTypography>{option.title}</StyledTypography>
          </StyledBox>
          <Divider sx={{ borderBottomWidth: theme.spacing(0.1) }} />

          <Box>
            <List>
              {option.routes.map((route) => (
                <StyledListItem
                  button
                  key={route.route}
                  onClick={async () => {
                    navigate(route.route);
                    if (route.function) {
                      await route.function();
                    }
                  }}
                >
                  {route.name}
                </StyledListItem>
              ))}
            </List>
          </Box>
        </BoxContainer>
      ))}
    </Box>
  );
};
