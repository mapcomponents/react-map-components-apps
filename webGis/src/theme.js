import { createTheme } from "@mui/material";
import { deepmerge } from '@mui/utils';
import { getTheme } from "@mapcomponents/react-maplibre";

const theme = createTheme(deepmerge(getTheme("light"),{
  typography: {},
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          color: "#fff",
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#fff",
        },
        root: {
          "::before": { borderColor: "#fff" },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          "::before": { borderColor: "#fff" },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#fff",
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
  palette: {
    primary: {
      main: "#2071B5",
    },
    secondary: {
      main: "#DD3333",
    },
    red: "#DD3333",
    yellow: "#FFDA00",
    blue: "#2071B5",
    greyV: "#4E4B48",
    white: "#FFFFFF",
    darkGreen: "#005C63",
    green: "#3DC07C",
  },
  zIndex: {
    snackbar: 3000,
  },
}));

export default theme;
