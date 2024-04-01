import { useTheme } from "@mui/material";
// import { Box } from "@mui/system";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";


import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface IMenuDrawerProps {
  children: React.ReactNode;
}

export const MenuDrawer: React.FC<IMenuDrawerProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer open={true} variant="permanent">
        <Box
          width={theme.spacing(27)}
          height="100%"
        //   sx={{ backgroundColor: theme.palette.primary.main }}
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

          <List>
          {['Movimentações', 'Saldos', 'Categorias', 'Contas'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={theme.spacing(25)}>
        {children}
      </Box>




    </>
  );
};