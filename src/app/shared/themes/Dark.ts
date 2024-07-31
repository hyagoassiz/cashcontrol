import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#4C4577",
      dark: "#383163", // Ton mais escuro calculado
      light: "#605B8B", // Ton mais claro calculado

      contrastText: "#D3D3D3",
    },

    secondary: {
      main: "#E0980C",
      dark: "#B8740A",
      light: "#F3B242",

      contrastText: "#151819",
    },

    background: {
      paper: "#3A3E49",
      default: "#F5F5F5",
    },
    text: {
      primary: "#E0980C", // Cor do texto primário
      secondary: "#979797", // Cor do texto secundário
      disabled: "#979797", // Cor do texto desabilitado
    },
  },
});
