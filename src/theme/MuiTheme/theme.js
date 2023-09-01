import { createTheme } from "@mui/material";


export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#1dafac",
      dark: "#156f70",
      light: "#36cbc5",
      contrastText: "#fff",
      textAltered: "#fff",
    },
    background: {
      paper: "#3B3B3E",
      default: "#101014",
    },
  },
  typography: {
    allVariants: {
      color: "#fff"
    }
  }
});