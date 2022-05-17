import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useEffect, useContext } from "react";

import AppContext from "../AppContext";
import {MlWmsLayer} from "@mapcomponents/react-maplibre";

export default function NestedListItem(props) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    //console.log(appContext.wmsOrGeoJSONVisible[props.wmsUrl] + props.wmsUrl);
  });

  return (
    <>
      {props.wmsUrl && (
        <ListItem
          key={props.id}
          disablePadding
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <ListItemIcon style={{ minWidth: "10px" }}>
            {props.open[props.id] ? (
              <IconButton
                style={{ padding: "0px" }}
                onClick={() => props.handleClick(props.id)}
              >
                <ExpandLess />
              </IconButton>
            ) : (
              <IconButton
                style={{ padding: "0px" }}
                onClick={() => props.handleClick(props.id)}
              >
                <ExpandMore />
              </IconButton>
            )}
          </ListItemIcon>
          <IconButton
            style={{ padding: "0px", marginRight: "5px" }}
            onClick={() => {
              appContext.setWmsOrGeoJSONVisible({
                ...appContext.wmsOrGeoJSONVisible,
                [props.wmsUrl]:
                  appContext.wmsOrGeoJSONVisible[props.wmsUrl] == undefined
                    ? false
                    : !appContext.wmsOrGeoJSONVisible[props.wmsUrl],
              });
            }}
            aria-label="toggle visibility"
          >
            {appContext.wmsOrGeoJSONVisible[props.wmsUrl] ||
            appContext.wmsOrGeoJSONVisible[props.wmsUrl] == undefined ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </IconButton>

          <ListItemText primary={props.capabilities?.Service?.Title} />
        </ListItem>
      )}
      {props.layers?.map?.((layer, idx) => {
        return layer?.Name ? (
          <>
            <Collapse in={props.open[props.id]} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                style={{ paddingLeft: "16px", paddingRight: "16px" }}
              >
                <ListItem
                  disablePadding
                  sx={{ pl: 6 }}
                  key={layer.Name + idx}
                >
                  <IconButton
                    disabled={
                      !appContext.wmsOrGeoJSONVisible[props.wmsUrl] &&
                      appContext.wmsOrGeoJSONVisible[props.wmsUrl] != undefined
                    }
                    style={{
                      padding: "0px",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      let _layers = [...props.layers];
                      _layers[idx].visible = !_layers[idx].visible;
                      props.setLayers([..._layers]);
                    }}
                    aria-label="toggle visibility"
                  >
                    {props.layers[idx].visible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                  <ListItemText primary={layer?.Title} />
                </ListItem>
              </List>
            </Collapse>

            <MlWmsLayer
              key={layer?.Name + idx}
              url={props.wmsUrl}
              urlParameters={{
                ...props.urlParams,
                layers: layer?.Name,
              }}
              visible={
                (appContext.wmsOrGeoJSONVisible[props.wmsUrl] ||
                  appContext.wmsOrGeoJSONVisible[props.wmsUrl] == undefined) &&
                props.layers[idx].visible
              }
              insertBeforeLayer={
                "Order-" + props.componentId.current + "-" + idx
              }
            />
          </>
        ) : (
          <></>
        );
      })}
    </>
  );
}
