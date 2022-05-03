import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";

import Box from "@mui/material/Box";

import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";

import { MlFeatureEditor } from "@mapcomponents/react-maplibre";

import * as turf from "@turf/turf";

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

function MeasurePolygon(props) {
  const classes = useStyles(theme);

  const [length, setLength] = useState(0);

  return (
    <div style={{ width: "200px" }}>
      <Grid
        container
        style={{
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <SquareFootOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px" }}>Measure Polygon</h4>
      </Grid>

      <Box m={2} style={{ textAlign: "left" }}>
        <MlFeatureEditor
          debug={true}
          onChange={(features) => {
            console.log(features);
            try {
              setLength(turf.area(features[0]) / 1000000);
            } catch (e) {
              console.log(e);
            }
          }}
          mode="custom_polygon"
        ></MlFeatureEditor>
        Fläche: {length} km&sup2;
      </Box>
    </div>
  );
}

export default MeasurePolygon;
