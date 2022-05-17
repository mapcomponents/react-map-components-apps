import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import theme from "../../theme";

const MeasureWindow = (props) => {

    return (
      <div style={{ width: "200px", color: "#fff" }}>
        <Grid
          container
          style={{
            textAlign: "left",
            alignItems: "center",
          }}
        >
          {props.icon}

          <h4 style={{ margin: "0px" }}>{props.measureName}</h4>
        </Grid>

        <Box m={2} style={{ textAlign: "left" }}>
          {props.measureType}
        </Box>
      </div>
    );
}

export default MeasureWindow
