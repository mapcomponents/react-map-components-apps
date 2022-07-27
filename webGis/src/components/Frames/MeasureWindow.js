import theme from "../../theme";
import {MlMeasureTool} from "@mapcomponents/react-maplibre"
import { Select, Box, Grid, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme)=> ({
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

const MeasureWindow = (props) => {
    const [unit, setUnit] = useState("kilometers");
    const handleChange = (event) => {
      setUnit(event.target.value);
    };
  const classes = useStyles(theme);

    return (
      <div style={{color: "#ddd", margin: "5px", minWidth: "200px" }}>
        <Grid
          container
          style={{
            textAlign: "left",
          }}
        >
          {props.icon}
          <h4 style={{ margin: "0px" }}>{props.measureName}</h4>
        </Grid>

        <FormControl
          variant="standard"
          style={{ marginBottom: "20px", width: "80%" }}
        >
          <Select
            name={"units"}
            onChange={handleChange}
            label={"Unit for measurement"}
            defaultValue={"kilometers"}
            sx={{textAlign: "left", padding: "5px"}}
            MenuProps={{
              style: { zIndex: "2001" },
            }}
          >
            <MenuItem value={"kilometers"}>Kilometers</MenuItem>
            <MenuItem value={"miles"}>Miles</MenuItem>
          </Select>
        </FormControl>
        <Box m={2} style={{ textAlign: "left" }}>
          {props.measureType=== "line" ? "Length" : "Area"} : <MlMeasureTool measureType={props.measureType} unit={unit} />
        </Box>
      </div>
    );
}

export default MeasureWindow
