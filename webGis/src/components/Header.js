import makeStyles from "@mui/styles/makeStyles";
import theme from "../theme.js";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { ReactComponent as MapcomponentsIconText } from "../assets/WG-MapComponents-Logo_rgb-weisse-schrift.svg";
import { ReactComponent as MapcomponentsIcon } from "../assets/WG-MapComponents-Signet_rgb.svg";

import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Grid from "@mui/material/Grid";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import AppContext from "../AppContext.js";

import { useEffect, useCallback, useState, useContext, useRef } from "react";
import { useMap } from "@mapcomponents/react-maplibre";
import { MapContext } from "@mapcomponents/react-maplibre";

import * as React from "react";

const useStyles = makeStyles((theme) => ({
   icon: {
      width: "40px",
      margin: "10px",
      "@media (max-width: 900px)": {
         margin: "10px",
      },
   },
   iconV: {
      marginTop: "5px",
      height: "auto",
      width: "220px",
      minWidth: "220px",
      marginBottom: "auto",
   },
   iconM: {
      marginTop: "4px",
      width: "60px",
   },
   iconbutton: {
      padding: "0px !important",
   },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Header(props) {
   const classes = useStyles(theme);
   const mediaIsMobile = useMediaQuery("(max-width:900px)");

   const appContext = useContext(AppContext);

   const mapRef = useRef(undefined);
   const mapContext = useContext(MapContext);
   const initializedRef = useRef(false);

   const [snackbarOpen, setSnackbarOpen] = React.useState(false);

   const handleClickSnackbar = () => {
      setSnackbarOpen(true);
   };

   const handleCloseSnackbar = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }

      setSnackbarOpen(false);
   };

   const mapHook = useMap({
      mapId: props.mapId,
      waitForLayer: props.insertBeforeLayer,
   });

   const [locationAccessDenied, setLocationAccessDenied] = useState(false);
   const [locationCentered, setLocationCentered] = useState(false);

   const colorFilterString =
      "invert(31%) sepia(92%) saturate(861%) hue-rotate(178deg) brightness(95%) contrast(86%)";

   const handleClick = useCallback(
      (element) => {
         //if there is no geojson loaded, show error snackbar
         if (
            appContext.includedGeoJSONs.length == 0 &&
            element == "lgiFeatureInfo"
         ) {
            handleClickSnackbar();
            return;
         }

         let newState = props.framesEnabled.slice();

         if (newState.includes(element)) {
            const index = newState.indexOf(element);
            if (index > -1) {
               newState.splice(index, 1);
            }
         } else {
            newState.push(element);
         }
         ////////////////////////Try///////////////

         if (mediaIsMobile == true) {
            if (
               [
                  "print",
                  "layers",
                  "measurePolygon",
                  "measureLine",
                  "featureInfo",
                  "lgiFeatureInfo",
                  "wmsLoader",
                  "geojsonLoader",
               ].includes(element)
            ) {
               let index = newState.indexOf("print");
               if (index > -1 && element != "print") {
                  newState.splice(index, 1);
               }

               index = newState.indexOf("layers");
               if (index > -1 && element != "layers") {
                  newState.splice(index, 1);
               }
               index = newState.indexOf("measurePolygon");
               if (index > -1 && element != "measurePolygon") {
                  newState.splice(index, 1);
               }

               index = newState.indexOf("measureLine");
               if (index > -1 && element != "measureLine") {
                  newState.splice(index, 1);
               }

               index = newState.indexOf("featureInfo");
               if (index > -1 && element != "featureInfo") {
                  newState.splice(index, 1);
                  appContext.setFeatureInfoEnabled(false);
               }

               index = newState.indexOf("lgiFeatureInfo");
               if (index > -1 && element != "lgiFeatureInfo") {
                  newState.splice(index, 1);
               }
               index = newState.indexOf("wmsLoader");
               if (index > -1 && element != "wmsLoader") {
                  newState.splice(index, 1);
               }

               index = newState.indexOf("geojsonLoader");
               if (index > -1 && element != "geojsonLoader") {
                  newState.splice(index, 1);
               }
            }
         } else {
            if (
               [
                  "measurePolygon",
                  "measureLine",
                  "featureInfo",
                  "lgiFeatureInfo",
               ].includes(element)
            ) {
               let index = newState.indexOf("measurePolygon");
               if (index > -1 && element != "measurePolygon") {
                  newState.splice(index, 1);
               }

               index = newState.indexOf("measureLine");
               if (index > -1 && element != "measureLine") {
                  newState.splice(index, 1);
               }

               index = newState.indexOf("featureInfo");
               if (index > -1 && element != "featureInfo") {
                  newState.splice(index, 1);
                  appContext.setFeatureInfoEnabled(false);
               }

               index = newState.indexOf("lgiFeatureInfo");
               if (index > -1 && element != "lgiFeatureInfo") {
                  newState.splice(index, 1);
               }
            }
         }

         if (element == "featureInfo") {
            appContext.setFeatureInfoEnabled(newState.includes(element));
         }

         props.setFramesEnabled(newState);
      },
      [props.framesEnabled, appContext.includedGeoJSONs]
   );

   const handleMovingMap = useCallback(() => {
      setLocationCentered(false);

      //remove listener
      mapRef.current?.off?.("move", handleMovingMap);
   });

   const moveToCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
         getLocationSuccess,
         getLocationError
      );
   };

   const getLocationSuccess = (location) => {
      mapHook.map.setCenter([
         location.coords.longitude,
         location.coords.latitude,
      ]);

      //set listener for moving away from location
      mapRef.current.on("move", handleMovingMap);

      setLocationCentered(true);
   };

   const getLocationError = () => {
      console.log("Access of user location denied");
      setLocationAccessDenied(true);
   };

   useEffect(() => {
      if (!mapContext?.mapExists?.(props.mapId) || initializedRef.current)
         return;
      initializedRef.current = true;
      mapRef.current = mapContext.getMap(props.mapId);
   }, [mapContext.mapIds, mapContext, props.mapId]);

   return (
      <>
         <AppBar
            position="fixed"
            elevation={0}
            color="primary"
            style={{
               marginTop: mediaIsMobile ? "0px" : "50px",
               backgroundColor: "rgba(55,55,55,0.8)",
               height: mediaIsMobile
                  ? props.extended
                     ? "initial"
                     : "80px"
                  : "80px",
               width: mediaIsMobile ? "100%" : props.extended ? "" : "105px",
            }}
         >
            <Toolbar style={{ paddingLeft: "10px" }}>
               <Grid container style={{ marginTop: "10px" }}>
                  {mediaIsMobile ? (
                     <Grid
                        item
                        xs={12}
                        style={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <MapcomponentsIconText className={classes.iconV} />
                     </Grid>
                  ) : (
                     ""
                  )}
                  {props.extended && (
                     <Grid
                        item
                        xs={12}
                        md={4}
                        style={{
                           display: "flex",
                           alignItems: mediaIsMobile
                              ? "space-evenly"
                              : "center",
                           justifyContent: mediaIsMobile
                              ? "space-evenly"
                              : "center",
                        }}
                     >
                        <Tooltip title="Show Layer Tree">
                           <IconButton
                              color="inherit"
                              className={classes.iconbutton}
                              onClick={() => handleClick("layers")}
                           >
                              <DynamicFeedOutlinedIcon
                                 style={
                                    props.framesEnabled.includes("layers")
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="WMS Feature Info">
                           <IconButton
                              color="inherit"
                              className={classes.iconbutton}
                              onClick={() => handleClick("featureInfo")}
                           >
                              <InfoOutlinedIcon
                                 style={
                                    props.framesEnabled.includes("featureInfo")
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              ></InfoOutlinedIcon>
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                           <IconButton
                              color="inherit"
                              className={classes.iconbutton}
                              onClick={() => handleClick("print")}
                           >
                              <LocalPrintshopOutlinedIcon
                                 style={
                                    props.framesEnabled.includes("print")
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              ></LocalPrintshopOutlinedIcon>
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="WMS Loader">
                           <IconButton
                              onClick={() => handleClick("wmsLoader")}
                              color="inherit"
                              className={classes.iconbutton}
                           >
                              <div
                                 style={
                                    props.framesEnabled.includes("wmsLoader")
                                       ? {
                                            filter: colorFilterString,
                                            width: "45px",
                                         }
                                       : { width: "45px" }
                                 }
                                 className={classes.icon}
                              >
                                 WMS
                              </div>
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Move to current Location">
                           <IconButton
                              color="inherit"
                              className={classes.iconbutton}
                              onClick={() => moveToCurrentLocation()}
                              disabled={locationAccessDenied}
                           >
                              <RoomOutlinedIcon
                                 style={
                                    locationCentered
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              ></RoomOutlinedIcon>
                           </IconButton>
                        </Tooltip>
                     </Grid>
                  )}
                  {mediaIsMobile ? (
                     ""
                  ) : (
                     <Grid
                        item
                        xs={props.extended ? 4 : 12}
                        style={{
                           display: "flex",
                           justifyContent: props.extended
                              ? "center"
                              : "flex-start",
                        }}
                     >
                        {props.extended ? (
                           <MapcomponentsIconText className={classes.iconV} />
                        ) : (
                           <MapcomponentsIcon className={classes.iconM} />
                        )}
                     </Grid>
                  )}

                  {props.extended && (
                     <Grid
                        item
                        xs={12}
                        md={4}
                        style={{
                           display: "flex",
                           alignItems: mediaIsMobile
                              ? "space-evenly"
                              : "center",
                           justifyContent: mediaIsMobile
                              ? "space-evenly"
                              : "center",
                        }}
                     >
                        <Tooltip title="Measure Distance">
                           <IconButton
                              color="inherit"
                              className={classes.iconbutton}
                              onClick={() => handleClick("measureLine")}
                           >
                              <StraightenOutlinedIcon
                                 style={
                                    props.framesEnabled.includes("measureLine")
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Measure Area">
                           <IconButton
                              color="inherit"
                              className={classes.iconbutton}
                              onClick={() => handleClick("measurePolygon")}
                           >
                              <SquareFootOutlinedIcon
                                 style={
                                    props.framesEnabled.includes(
                                       "measurePolygon"
                                    )
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="LGI Feature Info">
                           <IconButton
                              onClick={() => handleClick("lgiFeatureInfo")}
                              color="inherit"
                              className={classes.iconbutton}
                           >
                              <GroupsOutlinedIcon
                                 style={
                                    props.framesEnabled.includes(
                                       "lgiFeatureInfo"
                                    )
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Load GeoJson">
                           <IconButton
                              onClick={() => handleClick("geojsonLoader")}
                              color="inherit"
                              className={classes.iconbutton}
                           >
                              <ShareOutlinedIcon
                                 style={
                                    props.framesEnabled.includes(
                                       "geojsonLoader"
                                    )
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Display Live Data">
                           <IconButton
                              onClick={() => handleClick("livedata")}
                              color="inherit"
                              className={classes.iconbutton}
                           >
                              <LanguageOutlinedIcon
                                 style={
                                    props.framesEnabled.includes("livedata")
                                       ? { filter: colorFilterString }
                                       : {}
                                 }
                                 className={classes.icon}
                                 sx={{ fontSize: "1.5em" }}
                              />
                           </IconButton>
                        </Tooltip>
                     </Grid>
                  )}
                  {props.extended ? (
                     <Tooltip title="Close">
                        <IconButton
                           style={{
                              position: "absolute",
                              marginBottom: "30px",
                              right: "0",
                           }}
                           edge="start"
                           color="inherit"
                           onClick={(ev) => {
                              props.setHeaderExtended(!props.extended);
                           }}
                        >
                           {props.extended ? (
                              <CloseOutlinedIcon style={{ width: "30px" }} />
                           ) : (
                              <MenuOutlinedIcon style={{ width: "30px" }} />
                           )}
                        </IconButton>
                     </Tooltip>
                  ) : (
                     <Tooltip title="Open Menu">
                        <IconButton
                           style={{
                              position: "absolute",
                              marginBottom: "30px",
                              right: "0",
                           }}
                           edge="start"
                           color="inherit"
                           onClick={(ev) => {
                              props.setHeaderExtended(!props.extended);
                           }}
                        >
                           {props.extended ? (
                              <CloseOutlinedIcon style={{ width: "30px" }} />
                           ) : (
                              <MenuOutlinedIcon style={{ width: "30px" }} />
                           )}
                        </IconButton>
                     </Tooltip>
                  )}
               </Grid>
            </Toolbar>
         </AppBar>

         <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
         >
            <Alert
               onClose={handleCloseSnackbar}
               severity="error"
               sx={{ width: "100%" }}
            >
               Bitte zunächst eine GeoJSON-Datei laden.
            </Alert>
         </Snackbar>
      </>
   );
}

export default Header;
