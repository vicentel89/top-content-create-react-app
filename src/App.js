import React from "react";
import "./App.css";
import Feed from "./Feed";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Menu from "./Menu";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <Feed />
    </ThemeProvider>
  );
}

export default App;
