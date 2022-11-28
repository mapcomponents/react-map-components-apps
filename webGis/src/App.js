import "./App.css";
import { MapLibreMap, MlNavigationTools } from "@mapcomponents/react-maplibre";

import * as React from "react";
import Header from "./components/Header";
import { useState } from "react";
//import "maplibre-gl/dist/maplibre-gl.css";
import { MlFillExtrusionLayer } from "@mapcomponents/react-maplibre";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomDraggableFrame from "./components/CustomDraggableFrame";

function App() {
  const [headerExtended, setHeaderExtended] = useState(false);
  const [framesEnabled, setFramesEnabled] = useState([]);
  const [pitch, setPitch] = useState(false);

  const mediaIsMobile = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Header
        extended={headerExtended}
        setHeaderExtended={setHeaderExtended}
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
      />

      <CustomDraggableFrame
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
      />

      {mediaIsMobile ? (
        <MlNavigationTools
          componentId="toolbar"
          show3DButton={false}
          showZoomButtons={false}
          sx={{ bottom: "50px", right: "15px" }}
        />
      ) : (
        <MlNavigationTools
          componentId="toolbar"
          sx={{ bottom: "25px", right: "0px" }}
        />
      )}

      {pitch && <MlFillExtrusionLayer />}
      <MapLibreMap
        mapId="map_1"
        options={{
          zoom: 11.5,
          style:
            //https://wms.wheregroup.com/tileserver/style/osm-bright.json
            "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json",
          center: [7.0851268, 50.73884],
        }}
      />
    </>
  );
}

export default App;
