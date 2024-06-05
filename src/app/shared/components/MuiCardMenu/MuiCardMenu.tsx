import {
  Box,
  Divider,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { IOptionsMenu } from "../../interfaces/IOptionsMenu";
import { useNavigate } from "react-router-dom";

interface IMuiCardMenu {
  options: IOptionsMenu[];
}

export const MuiCardMenu = ({ options }: IMuiCardMenu) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{display: 'flex'}}>
      {options.map((option) => (
        <Box
          sx={{
            width: "200px",
            height: "250px",
            margin: "10px",
            boxShadow: "0.5px 1px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Typography sx={{fontWeight: 600, fontSize: '16px'}}>{option.title}</Typography>
          </Box>
          <Divider sx={{ borderBottomWidth: theme.spacing(0.1) }} />

          <Box>
            <List>
              {option.routes.map((route) => (
                <ListItem
                  button
                  key={route.route}
                  onClick={() => navigate(route.route)}
                >
                  {route.name}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
