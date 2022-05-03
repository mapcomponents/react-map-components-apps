import { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";
import Grid from "@mui/material/Grid";
import NestedList from "../NestedList.js";

import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";

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
    color: theme.palette.white,
  },
  iconbutton: {
    padding: "0px !important",
  },
}));

function LayerTree(props) {
  const classes = useStyles(theme);

  return (
    <div style={{ width: "300px", maxHeight: "60vh", overflow: "auto" }}>
      <Grid container style={{ textAlign: "left", alignItems: "center" }}>
        <DynamicFeedOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px", color: theme.palette.white }}>
          Ebenenbaum
        </h4>

        <NestedList //{...props}
        ></NestedList>
      </Grid>
    </div>
  );
}

export default LayerTree;
