import { useEffect, useState, useContext } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AppContext from "../../AppContext.js";

import { MlFeatureEditor } from "@mapcomponents/react-maplibre";

import * as turf from "@turf/turf";

const useStyles = makeStyles(() => ({
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

function LineGeoJSONIntersectionFeatureInfo() {
  const classes = useStyles(theme);

  const appContext = useContext(AppContext);

  const [results, setResults] = useState([]);

  useEffect(() => {});

  return (
    <div style={{ width: "400px", maxHeight: "60vh", overflow: "auto" }}>
      <Grid
        container
        style={{
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <GroupsOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px" }}>GeoJSON Feature Info by Line</h4>
      </Grid>
      <MlFeatureEditor
        debug={true}
        onChange={(features) => {
          setResults([]);

          appContext.includedGeoJSONs.forEach((el) => {
            el.features.forEach((feature) => {
              features.forEach((line) => {
                if (turf.booleanIntersects(line, feature)) {
                  setResults((state) => [...state, feature]);

                  return;
                }
              });
            });
          });
        }}
        mode="draw_line_string"
      ></MlFeatureEditor>

      <Box m={2} style={{}}>
        <Typography style={{ textAlign: "left" }}>
          {results.length} Treffer
        </Typography>
      </Box>

      {results.map((feature) => {
        return (
          <Box m={2} >
            <TableContainer component={Paper}>
              <Table sx={{}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{feature.type}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(feature.properties).map((key) => (
                    <TableRow
                      key={key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell align="right">
                        {feature.properties[key]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </div>
  );
}

export default LineGeoJSONIntersectionFeatureInfo;
