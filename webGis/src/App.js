import "./App.css";
import {
  MapLibreMap,
  MlNavigationTools,
  MlWmsLayer,
} from "@mapcomponents/react-maplibre";

import * as React from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";

import { useState, useEffect } from "react";
import DraggableFrame from "./components/DraggableFrame";
import Print from "./components/Frames/Print";
import LayerTree from "./components/Frames/LayerTree";
import MeasureLine from "./components/Frames/MeasureLine";
import MeasureWindow from "./components/Frames/MeasureWindow"
import MeasurePolygon from "./components/Frames/MeasurePolygon";
import FeatureInfo from "./components/Frames/FeatureInfo";
import WmsLoader from "./components/Frames/WmsLoader";
import GeoJSONLoader from "./components/Frames/GeoJSONLoader";
import LineGeoJSONIntersectionFeatureInfo from "./components/Frames/LineGeoJSONIntersectionFeatureInfo";
import "maplibre-gl/dist/maplibre-gl.css";

import { ExampleConfig } from "./components/MlIconLayerstories";
import { MlFillExtrusionLayer } from "@mapcomponents/react-maplibre";

import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import makeStyles from "@mui/styles/makeStyles";
import theme from "./theme";

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

function App() {
  const [headerExtended, setHeaderExtended] = useState(false);
  const [framesEnabled, setFramesEnabled] = useState([]);
  const [pitch, setPitch] = useState(false);

  const classes = useStyles(theme);

  return (
    <>
      <Header
        extended={headerExtended}
        setHeaderExtended={setHeaderExtended}
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
      ></Header>

      <DraggableFrame
        startPos={{ x: 100, y: 200 }}
        closable
        componentId="print"
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
        visible={framesEnabled.includes("print")}
      >
        <Print />
      </DraggableFrame>

      <DraggableFrame
        startPos={{ x: 500, y: 200 }}
        closable
        componentId="layers"
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
        visible={framesEnabled.includes("layers")}
      >
        <LayerTree></LayerTree>
      </DraggableFrame>

      {framesEnabled.includes("measureLine") && (
        <DraggableFrame
          startPos={{ x: 900, y: 200 }}
          closable
          componentId="measureLine"
          framesEnabled={framesEnabled}
          setFramesEnabled={setFramesEnabled}
        >
          <MeasureWindow measureType={<MeasureLine />} icon={<StraightenOutlinedIcon className={classes.iconTitle} />} />
        </DraggableFrame>
      )}

      {framesEnabled.includes("measurePolygon") && (
        <DraggableFrame
          startPos={{ x: 900, y: 200 }}
          closable
          componentId="measurePolygon"
          framesEnabled={framesEnabled}
          setFramesEnabled={setFramesEnabled}
        >
          <MeasureWindow measureType={<MeasurePolygon />} icon={<SquareFootOutlinedIcon className={classes.iconTitle} />} />
        </DraggableFrame>
      )}

      {framesEnabled.includes("featureInfo") && (
        <DraggableFrame
          startPos={{ x: 600, y: 200 }}
          closable
          componentId="featureInfo"
          framesEnabled={framesEnabled}
          setFramesEnabled={setFramesEnabled}
        >
          <FeatureInfo></FeatureInfo>
        </DraggableFrame>
      )}

      {framesEnabled.includes("lgiFeatureInfo") && (
        <DraggableFrame
          startPos={{ x: 600, y: 200 }}
          closable
          componentId="lgiFeatureInfo"
          framesEnabled={framesEnabled}
          setFramesEnabled={setFramesEnabled}
        >
          <LineGeoJSONIntersectionFeatureInfo></LineGeoJSONIntersectionFeatureInfo>
        </DraggableFrame>
      )}

      <MlNavigationTools componentId="toolbar" />

      {framesEnabled.includes("livedata") && <ExampleConfig></ExampleConfig>}

      <DraggableFrame
        startPos={{ x: 50, y: 200 }}
        closable
        componentId="wmsLoader"
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
        visible={framesEnabled.includes("wmsLoader")}
      >
        <WmsLoader />
      </DraggableFrame>

      <DraggableFrame
        startPos={{ x: 50, y: 400 }}
        closable
        componentId="geojsonLoader"
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
        visible={framesEnabled.includes("geojsonLoader")}
      >
        <GeoJSONLoader />
      </DraggableFrame>

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
