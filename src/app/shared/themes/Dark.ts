import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    primary: {// usada normalmente para coisas que precisam de destaque
      // variações da cor
      main: "#2F3940", //"#2F3940"
      dark: "#262F35", // Tom mais escuro para garantir legibilidad
      light: "#49565D", // Tom mais claro para contraste

      // serve para fazer contraste com a cor primária
      contrastText: "#D3D3D3",
    },

    secondary: {

      // variações da cor
      main: "#BEBEBE", // Cor complementar para fornecer contraste
      dark: "#2F3940",
      light: "#2F3940",

      // serve para fazer contraste com a cor primária
      contrastText: "#FFBA33",
    },

    background: {
        paper: "#FFFFFF", //usado dentro de carde normalnete destaca do fundo
        default: '#F5F5F5', //normalmenbte usado em fundo
        

    }
  },
});
