import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAppBar } from "./hooks/useAppBar";
import { Typography, useTheme } from "@mui/material";
import { options } from "./constants";
import PersonIcon from "@mui/icons-material/Person";
import DehazeIcon from "@mui/icons-material/Dehaze";

export const MuiAppBar: React.FC = () => {
  const { handleOpenUserMenu, anchorElUser, handleCloseUserMenu, navigate } =
    useAppBar();
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 18px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ p: 0 }}>
            <DehazeIcon
              sx={{
                color: theme.palette.text.primary,
                fontSize: theme.spacing(4),
              }}
            />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Configurações">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <PersonIcon
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: theme.spacing(4),
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {options.map((option) => (
              <MenuItem
                sx={{ gap: 1 }}
                key={option.name}
                onClick={async () => {
                  navigate(option.route);
                  if (option.function) {
                    await option.function();
                  }
                }}
              >
                {option.icon}
                <Typography sx={{ fontSize: "12px" }} textAlign="center">
                  {option.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
