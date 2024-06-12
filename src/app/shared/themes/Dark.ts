import { createTheme } from "@mui/material";

const darkThemePalette = {
  primary: {
    main: "#4C3575",
    dark: "#371B58",
    light: "#5B4B8A",
    contrastText: "#D3D3D3",
  },

  secondary: {
    main: "#E0980C",
    dark: "#FFFFFF",
    light: "#FFFFFF",
    contrastText: "#151819",
  },

  background: {
    paper: "#FFFFFF",
    default: "#F5F5F5",
  },
};

export const DarkTheme = createTheme({
  palette: darkThemePalette,
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "h5",
          },
          style: { color: darkThemePalette.primary.contrastText },
        },
        {
          props: {
            variant: "h6",
          },
          style: { color: darkThemePalette.primary.contrastText },
        },
        {
          props: {
            variant: "body1",
          },
          style: { color: darkThemePalette.primary.contrastText },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: {
            variant: "contained",
          },
          style: {
            color: darkThemePalette.secondary.contrastText,
            backgroundColor: darkThemePalette.secondary.main,
            "&:hover": {
              backgroundColor: darkThemePalette.secondary.main,
              opacity: 0.8,
            },
          },
        },
        {
          props: {
            variant: "text",
          },
          style: {
            color: darkThemePalette.secondary.contrastText,
            "&:hover": {
              opacity: 0.8,
            },
          },
        },
      ],
    },
    MuiTableCell: {
      variants: [
        {
          props: {
            variant: "head",
          },
          style: {
            color: darkThemePalette.primary.contrastText,
            borderColor: darkThemePalette.primary.dark,
          },
        },
        {
          props: {
            variant: "body",
          },
          style: {
            color: darkThemePalette.primary.contrastText,
            borderColor: darkThemePalette.primary.dark,
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: darkThemePalette.secondary.main, // cor do label
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: darkThemePalette.secondary.main, // cor do label quando focado
          },
          "& .MuiInputBase-input": {
            color: darkThemePalette.primary.contrastText, // cor do texto
          },
        },
      },
    },
  },
});
