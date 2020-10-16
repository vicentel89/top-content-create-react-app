import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function Menu() {
  return (
    <AppBar position="fixed" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <Typography variant="h6" color="primary">
          App Logo
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
