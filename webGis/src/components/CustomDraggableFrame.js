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
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const classes = useStyles(theme);

  const entry = [
    {
      title: "print",
      component: <Print />,
      easy: true,
      alwaysActive: false,
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