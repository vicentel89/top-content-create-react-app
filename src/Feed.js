import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Map, GoogleApiWrapper } from "google-maps-react";
import photo from "./assets/images/photosample.jpg";
import SideMenu from "./SideMenu";

const FeedStatusBoardStyles = makeStyles((theme) => ({
  container: {
    padding: 16,
    marginTop: 56,
  },
  formControlContainer: {
    padding: "8px 0 24px",
  },
  formControl: { width: "100%" },
}));

function FeedStatusBoard(props) {
  const classes = FeedStatusBoardStyles();
  const [categorie, setCategorie] = React.useState("");

  const handleChange = (event) => {
    setCategorie(event.target.value);
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <Typography variant="h6" color="primary" gutterBottom>
          Charleston
        </Typography>
      </Grid>
      <Grid item xs={6} container justify="flex-end">
        <Button color="primary" onClick={props.handleMapView}>
          {props.mapView ? "View list" : "View map"}
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.formControlContainer}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="Categorie">Categories</InputLabel>
          <Select
            className={classes.formControl}
            labelId="Categorie"
            id="Categorie"
            value={categorie}
            onChange={handleChange}
            label="Categorie"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"Hidden Gems"}>Hidden Gems</MenuItem>
            <MenuItem value={"Coolest Decor"}>Coolest Decor</MenuItem>
            <MenuItem value={"Food Porn"}>Food Porn</MenuItem>
            <MenuItem value={"Vibes + Armosphere"}>Vibes + Armosphere</MenuItem>
            <MenuItem value={"Instagrammable"}>Instagrammable</MenuItem>
            <MenuItem value={"Party Spots"}>Party Spots</MenuItem>
            <MenuItem value={"Long Lines"}>Long Lines</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

const ContentBoardStyles = makeStyles((theme) => ({
  card: {
    marginBottom: 16,
  },
  cardImage: {
    width: "100%",
  },
  titleContainer: { padding: 16 },
  titleNumber: {
    paddingRight: 8,
  },
  cardActions: {
    padding: "0 4px",
  },
  arrowIcon: {
    fontSize: "2.5rem",
  },
  score: {
    padding: "0 4px",
  },
  cardContent: {
    paddingTop: 4,
  },
}));

function ContentBoard(props) {
  const classes = ContentBoardStyles();

  return props.content.map((item, index) => (
    <Card key={item.place + index} className={classes.card}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography
          color="primary"
          variant="h6"
          className={classes.titleNumber}
        >
          {`${index + 1}.`}
        </Typography>
        <Typography variant="body1">{item.place}</Typography>
      </Grid>
      <img src={photo} className={classes.cardImage} alt="" />
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton>
          <FontAwesomeIcon
            icon={faArrowAltCircleUp}
            className={classes.arrowIcon}
          />
        </IconButton>
        <Typography variant="h5" color="primary" className={classes.score}>
          {item.score}
        </Typography>
        <IconButton>
          <FontAwesomeIcon
            icon={faArrowAltCircleDown}
            className={classes.arrowIcon}
          />
        </IconButton>
      </CardActions>
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  ));
}

function CityMap(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mapStyles = {
    height: "calc(100vh - 64px)",
    position: "fixed",
    width: "calc(41.7% - 16px)",
    marginBottom: "24px",
  };

  const mobileMapStyles = {
    height: "calc(100vh - 215px)",
    position: "fixed",
    width: "100%",
    marginBottom: "24px",
  };

  function MapContainer(props) {
    return (
      <Map
        mapTypeControl={false}
        streetViewControl={false}
        zoomControlOptions={{
          position: props.google.maps.ControlPosition.TOP_LEFT,
        }}
        google={props.google}
        zoom={10}
        initialCenter={{
          lat: 32.784618,
          lng: -79.940918,
        }}
      />
    );
  }

  const MapWithKey = GoogleApiWrapper({
    apiKey: "AIzaSyB0ynwSG7FytWwGBoq07CFEskQBld0P2wE",
  })(MapContainer);

  return (
    <div style={mobile ? mobileMapStyles : mapStyles}>
      <MapWithKey />
    </div>
  );
}

const feedStyles = makeStyles((theme) => ({
  contentColumn: {
    padding: 24,
  },
  city: {
    marginBottom: 24,
  },
  map: {
    paddingLeft: 16,
  },
}));

export default function Feed() {
  const classes = feedStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  //State and handle to change from list view to map view//
  const [mapView, setMapView] = useState(false);
  const handleMapView = () => {
    setMapView(!mapView);
  };

  if (mobile) {
    return (
      <>
        <FeedStatusBoard handleMapView={handleMapView} mapView={mapView} />
        {mapView ? <CityMap /> : <ContentBoard content={sampleArr} />}
      </>
    );
  } else {
    return (
      <>
        <SideMenu>
          <Grid item xs={5} className={classes.contentColumn}>
            <Typography
              variant="h5"
              color="primary"
              className={classes.city}
              gutterBottom
            >
              Charleston
            </Typography>
            <ContentBoard content={sampleArr} />
          </Grid>
          <Grid item xs={5} className={classes.map}>
            <CityMap />
          </Grid>
        </SideMenu>
      </>
    );
  }
}

const sampleArr = [
  {
    place: "Stoll's Alley",
    score: 70,
    description: "Amazing hamburger with mac and cheese... :)",
  },
  {
    place: "Burguer Factory",
    score: 62,
    description: "The best burgers in town!!!",
  },
  {
    place: "In n' Out",
    score: 58,
    description: "Adict burguers...the best :P",
  },
  {
    place: "Stoll's Alley",
    score: 52,
    description: "Amazing hamburger with mac and cheese... :)",
  },
  {
    place: "Burguer Factory",
    score: 47,
    description: "The best burgers in town!!!",
  },
];
