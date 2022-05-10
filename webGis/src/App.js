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
import MeasurePolygon from "./components/Frames/MeasurePolygon";
import FeatureInfo from "./components/Frames/FeatureInfo";
import WmsLoader from "./components/Frames/WmsLoader";
import GeoJSONLoader from "./components/Frames/GeoJSONLoader";
import LineGeoJSONIntersectionFeatureInfo from "./components/Frames/LineGeoJSONIntersectionFeatureInfo";
import "maplibre-gl/dist/maplibre-gl.css";

import { ExampleConfig } from "./components/MlIconLayerstories";
import MlFillExtrusionLayer from "./components/MlFillExtrusionLayer";

import { useContext } from "react";
import AppContext from "./AppContext";

function App() {
  const [headerExtended, setHeaderExtended] = useState(false);
  const [framesEnabled, setFramesEnabled] = useState([]);
  const [pitch, setPitch] = useState(false);

  const appContext = useContext(AppContext);

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
          <MeasureLine></MeasureLine>
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
          <MeasurePolygon></MeasurePolygon>
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

      {pitch && <MlFillExtrusionLayer></MlFillExtrusionLayer>}

      <MapLibreMap
        mapId="map_1"
        options={{
          zoom: 8,
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
