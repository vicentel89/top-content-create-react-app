import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    background: {
      default: "#F5F5F5",
    },
    primary: {
      light: "#ffa079",
      main: "#E2704C",
      dark: "#ab4122",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000",
    },
  },
});

export default theme;
