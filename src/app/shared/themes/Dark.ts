import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#1B2537",
      dark: "#18202D",
      light: "#283645",
      contrastText: "#D3D3D3",
    },
    secondary: {
      main: "#373B8A",
      dark: "#2C2F6F",
      light: "#6B6FBB",
      contrastText: "#151819",
    },

    background: {
      paper: "#141A28",
      default: "#18202D",
    },
    text: {
      primary: "#D3D3D3",
      secondary: "#B0B0B0",
      disabled: "#6D6D6D",
    },
    divider: "#283645",
  },
});
