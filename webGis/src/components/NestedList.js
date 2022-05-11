import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import AppContext from "../AppContext";

import { useEffect, useCallback, useContext, useRef } from "react";
import MlWmsLoader from "./MlWmsLoader";
import NestedListItemGeoJSON from "./NestedListItemGeoJSON";

import { useMap } from "@mapcomponents/react-maplibre";
import { MapContext } from "@mapcomponents/react-maplibre";

export default function NestedList(props) {
  const [open, setOpen] = React.useState({});

  const appContext = useContext(AppContext);

  const mapRef = useRef(undefined);
  const mapContext = useContext(MapContext);
  const initializedRef = useRef(false);

  const handleClick = useCallback(
    (id) => {
      //setOpen({ [id]: !open[id] });
      setOpen({ ...open, [id]: !open[id] });
    },
    [open]
  );

  useEffect(() => {
    //console.log(appContext.includedWms);
    //console.log(appContext.wmsOrGeoJSONVisible);
  });

  /*
  useEffect(() => {
    if (!mapContext?.mapExists?.(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
  }, [mapContext.mapIds, mapContext, props.mapId]);
  */

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        marginTop: "20px",
        marginBottom: "20px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      /*
      subheader={
        <ListSubheader
          style={{ backgroundColor: "inherit" }}
          component="div"
          id="nested-list-subheader"
        >
          Kategorie 1
        </ListSubheader>
      }
      */
    >
      <MlWmsLoader
        handleClick={handleClick}
        open={open}
        url="https://www.wms.nrw.de/geobasis/wms_nw_tfis"
        id="1"
      ></MlWmsLoader>
      <MlWmsLoader
        handleClick={handleClick}
        open={open}
        url="https://www.wms.nrw.de/geobasis/wms_nw_dtk50"
        id="2"
      ></MlWmsLoader>

      {appContext.includedWms.map((el, index) => {
        return (
          <MlWmsLoader
            handleClick={handleClick}
            open={open}
            url={el.url}
            id={"" + (index + 4)}
            username={el.username}
            password={el.password}
          ></MlWmsLoader>
        );
      })}

      {appContext.includedGeoJSONs.map((geojson, index) => {
        return (
          <>
            <NestedListItemGeoJSON
              id={"" + (index + appContext.includedWms.length + 4)}
              geojson={geojson}
            ></NestedListItemGeoJSON>
          </>
        );
      })}
    </List>
  );
}
