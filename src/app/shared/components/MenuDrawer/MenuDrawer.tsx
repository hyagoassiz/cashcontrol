import { Drawer, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

interface IMenuDrawerProps {
  children: React.ReactNode;
}

export const MenuDrawer: React.FC<IMenuDrawerProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer open={true} variant="permanent">
        <Box
          width={theme.spacing(25)}
          height="100%"
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          <Box width="100%" height={theme.spacing(8)} display="flex" alignItems="center" justifyContent="center">
            <LocalAtmIcon
              sx={{ fontSize: 50, color: theme.palette.primary.contrastText }}
            />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/inicio"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#FFFFFF",
              textDecoration: "none",
            }}>CASH CONTROL</Typography>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={theme.spacing(25)}>
        {children}
      </Box>
    </>
  );
};
