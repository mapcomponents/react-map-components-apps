import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";

import Box from "@mui/material/Box";

import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";

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

function MeasureLine(props) {
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
        <StraightenOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px" }}>Measure Line</h4>
      </Grid>

      <Box m={2} style={{ textAlign: "left" }}>
        <MlFeatureEditor
          debug={true}
          onChange={(features) => {
            console.log(features);
            setLength(turf.length(features[0]));
          }}
          mode="draw_line_string"
        ></MlFeatureEditor>
        Länge: {length} km
      </Box>
    </div>
  );
}

export default MeasureLine;
