import { useEffect, useContext } from "react";

import Grid from "@mui/material/Grid";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
    color: theme.palette.white,
  },
  iconbutton: {
    padding: "0px !important",
  },
}));

function FeatureInfo() {
  const classes = useStyles(theme);

  const appContext = useContext(AppContext);

  useEffect(() => {});

  return (
    <div style={{ width: "750px" }}>
      <Grid
        container
        style={{
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <InfoOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px" }}>
          WMS Feature Info
        </h4>
      </Grid>

      {Object.keys(appContext.featureInfoContent).map((key) => {
        return (
          <>
            <iframe
              style={{
                width: "100%",
                height: "300px",
                display:
                  appContext.wmsOrGeoJSONVisible[key] ||
                  appContext.wmsOrGeoJSONVisible[key] == undefined
                    ? "block"
                    : "none",
              }}
              srcDoc={appContext.featureInfoContent[key]}
              sandbox="allow-same-origin allow-popups-to-escape-sandbox"
              frameBorder="0"
            ></iframe>
          </>
        );
      })}
    </div>
  );
}

export default FeatureInfo;
