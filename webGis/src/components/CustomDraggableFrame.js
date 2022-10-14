import * as React from "react";
import "../App.css";
import theme from "../theme";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "maplibre-gl/dist/maplibre-gl.css";

import DraggableFrame from "./DraggableFrame";
import Print from "../components/Frames/Print";
import LayerTree from "../components/Frames/LayerTree";
import MeasureWindow from "../components/Frames/MeasureWindow";
import FeatureInfo from "../components/Frames/FeatureInfo";
import WmsLoader from "../components/Frames/WmsLoader";
import GeoJSONLoader from "../components/Frames/GeoJSONLoader";
import LineGeoJSONIntersectionFeatureInfo from "../components/Frames/LineGeoJSONIntersectionFeatureInfo";

import { ExampleConfig } from "../components/MlIconLayerstories";

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

function CustomDraggableFrame(props) {
  const classes = useStyles(theme);

  const entry = [
    {
      title: "print",
      component: <Print />,
      easy: true,
    },
    {
      title: "layers",
      component: <LayerTree />,
      easy: true,
    },
    {
      title: "measureLine",
      component: (
        <MeasureWindow
          measureType={"line"}
          measureName={"Measure Line"}
          icon={<StraightenOutlinedIcon className={classes.iconTitle} />}
        />
      ),
      easy: false,
    },
    {
      title: "measurePolygon",
      component: (
        <MeasureWindow
          measureType={"polygon"}
          measureName={"Measure Polygon"}
          icon={<SquareFootOutlinedIcon className={classes.iconTitle} />}
        />
      ),
      easy: false,
    },
    {
      title: "featureInfo",
      component: <FeatureInfo />,
      easy: false,
    },
    {
      title: "lgiFeatureInfo",
      component: <LineGeoJSONIntersectionFeatureInfo />,
      easy: false,
    },
    {
      title: "wmsLoader",
      component: <WmsLoader />,
      easy: true,
    },
    {
      title: "geojsonLoader",
      component: <GeoJSONLoader />,
      easy: true,
    },
  ];
  return (
    <>
      {entry.map((entry) => (
        <>
          {entry.easy ? (
            <DraggableFrame
              startPos={{
                x: 100,
                y: 200,
              }}
              closable
              componentId={entry.title}
              framesEnabled={props.framesEnabled}
              setFramesEnabled={props.setFramesEnabled}
              visible={props.framesEnabled.includes(entry.title)}
            >
              {entry.component}
            </DraggableFrame>
          ) : (
            <>
              {props.framesEnabled.includes(entry.title) && (
                <DraggableFrame
                  startPos={{
                    x: 100,
                    y: 200,
                  }}
                  closable
                  componentId={entry.title}
                  framesEnabled={props.framesEnabled}
                  setFramesEnabled={props.setFramesEnabled}
                  visible={props.framesEnabled.includes(entry.title)}
                >
                  {entry.component}
                </DraggableFrame>
              )}
            </>
          )}
        </>
      ))}
      {props.framesEnabled.includes("livedata") && <ExampleConfig />}
    </>
  );
}

export default CustomDraggableFrame;

{
  /*<DraggableFrame
        startPos={{
          x: 100,
          y: 200,
        }}
        closable
        componentId="print"
        framesEnabled={framesEnabled}
        setFramesEnabled={setFramesEnabled}
        visible={framesEnabled.includes("print")}
      >
        <Print />
      </DraggableFrame>
      <DraggableFrame
        startPos={{
          x: 500,
          y: 200,
        }}
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
          startPos={{
            x: 900,
            y: 200,
          }}
          closable
          componentId="measureLine"
          framesEnabled={framesEnabled}
          setFramesEnabled={setFramesEnabled}
          visible={framesEnabled.includes("measureLine")}
        >
          <MeasureWindow
            measureType={"line"}
            measureName={"Measure Line"}
            icon={<StraightenOutlinedIcon className={classes.iconTitle} />}
          />
        </DraggableFrame>
      )}
      {framesEnabled.includes("measurePolygon") && (
        <DraggableFrame
          startPos={{
            x: 900,
            y: 200,
          }}
          closable
          componentId="measurePolygon"
          framesEnabled={framesEnabled}
          setFramesEnabled={setFramesEnabled}
          visible={framesEnabled.includes("measurePolygon")}
        >
          <MeasureWindow
            measureType={"polygon"}
            measureName={"Measure Polygon"}
            icon={<SquareFootOutlinedIcon className={classes.iconTitle} />}
          />
        </DraggableFrame>
      )}
      {framesEnabled.includes("featureInfo") && (
        <DraggableFrame
          startPos={{
            x: 600,
            y: 200,
          }}
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
          startPos={{
            x: 600,
            y: 200,
          }}
          closable
          componentId="lgiFeatureInfo"
          framesEnabled={framesEnabled}
          setFramesEnabled={setFramesEnabled}
        >
          <LineGeoJSONIntersectionFeatureInfo></LineGeoJSONIntersectionFeatureInfo>
        </DraggableFrame>
      )} */
}
