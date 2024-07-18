import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    primary: {// usada normalmente para coisas que precisam de destaque
      // variações da cor
      main: "#4285F4",
      dark: "#1967D2",
      light: "#66A3FF",

            // serve para fazer contraste com a cor primária
      contrastText: "#000000",

    },

    secondary: {

      // variações da cor
      main: "#DB4437",
      dark: "#CC0000",
      light: "#FF6B60",


      // serve para fazer contraste com a cor primária
      contrastText: "#FFFFFF",
    },

    background: {
        paper: "#FFFFFF", //usado dentro de carde normalnete destaca do fundo
        default: "#F5F5F5", //normalmenbte usado em fundo
        

    }
  },
});
