import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 64,
  },
  sideBarContainer: {
    position: "fixed",
    width: "16.67%",
  },
  titleContainer: {
    padding: "24px 16px 16px",
  },
  title: { paddingBottom: 8 },
  listItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export default function SideMenu(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={2}>
        <div className={classes.sideBarContainer}>
          <div className={classes.titleContainer}>
            <Typography variant="h6" className={classes.title}>
              Categories
            </Typography>
            <Divider />
          </div>
          <List>
            {[
              "Hidden Gems",
              "Coolest Decor",
              "Food Porn",
              "Vibes + Atmosphere",
              "Instagrammable",
              "Party Spots",
              "Long Lines",
            ].map((item) => (
              <ListItem key={item} button className={classes.listItem}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
      {props.children}
    </Grid>
  );
}
