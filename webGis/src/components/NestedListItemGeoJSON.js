import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { MlGeoJsonLayer } from "@mapcomponents/react-maplibre";

import { useContext } from "react";

import AppContext from "../AppContext";

export default function NestedListItemGeoJSON(props) {
  const appContext = useContext(AppContext);

  return (
    <>
      <ListItem
        key={props.id}
        disablePadding
        sx={{ pl: 5 }}
        style={{ paddingRight: "16px" }}
      >
        <IconButton
          style={{ padding: "0px", marginRight: "5px" }}
          onClick={() => {
            appContext.setWmsOrGeoJSONVisible({
              ...appContext.wmsOrGeoJSONVisible,
              [props.geojson.name]:
                appContext.wmsOrGeoJSONVisible[props.geojson.name] == undefined
                  ? false
                  : !appContext.wmsOrGeoJSONVisible[props.geojson.name],
            });
          }}
          aria-label="toggle visibility"
        >
          {appContext.wmsOrGeoJSONVisible[props.geojson.name] ||
          appContext.wmsOrGeoJSONVisible[props.geojson.name] == undefined ? (
            <VisibilityIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </IconButton>

        <ListItemText primary={props.geojson.name + " (GeoJSON)"} />
      </ListItem>

      {(appContext.wmsOrGeoJSONVisible[props.geojson.name] ||
        appContext.wmsOrGeoJSONVisible[props.geojson.name] == undefined) && (
        <MlGeoJsonLayer
          paint={{
            "fill-color": "rgba(82,224,223,0.3)",
            "fill-outline-color": "rgb(0,0,0)",
          }}
          geojson={props.geojson}
          mapId="map_1"
        />
      )}
    </>
  );
}
