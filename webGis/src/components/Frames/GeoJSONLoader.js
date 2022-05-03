import { useCallback, useEffect, useState, useContext, useRef } from "react";

import Grid from "@mui/material/Grid";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import TextField from "@mui/material/TextField";
import AppContext from "../../AppContext.js";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "40px",
    margin: "10px",
  },
  iconTitle: {
    width: "40px",
    margin: "10px",
    marginTop: "0px",
    marginBottom: "0px",
  },
  iconbutton: {
    padding: "0px !important",
  },
}));

function GeoJSONLoader(props) {
  const classes = useStyles(theme);

  const inputRef = useRef(null);

  const appContext = useContext(AppContext);

  return (
    <div style={{ width: "300px" }}>
      <Grid
        container
        style={{
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <ShareOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px" }}>GeoJSON Loader</h4>
      </Grid>

      <Box m={2} style={{ textAlign: "left" }}>
        <Button
          variant="contained"
          disableElevation
          style={{
            backgroundColor: theme.palette.blue,
            marginTop: "20px",
            color: "white",
            float: "right",
            marginBottom: "20px",
          }}
          onClick={() => {
            inputRef.current.click();
          }}
        >
          GeoJSON auswählen
        </Button>

        <input
          type="file"
          hidden="hidden"
          accept="application/geo+json,application/vnd.geo+json,.geojson"
          ref={inputRef}
          onChange={(evt) => {
            console.log("File selected.");

            var file = evt.target.files[0]; // Read first selected file
            var reader = new FileReader();

            reader.fileName = file.name;
            console.log(file.name);

            reader.onload = function (readerEvt) {
              console.log(readerEvt.target.fileName);
            };

            reader.onload = function (theFile) {
              // Parse as (geo)JSON
              var geoJSONcontent = JSON.parse(theFile.target.result);

              //update AppContext with result
              let newState = appContext.includedGeoJSONs.slice();
              newState.push(geoJSONcontent);
              appContext.setIncludedGeoJSONs(newState);
            };

            // Read the GeoJSON as text
            reader.readAsText(file, "UTF-8");
          }}
        />
      </Box>
    </div>
  );
}

export default GeoJSONLoader;
