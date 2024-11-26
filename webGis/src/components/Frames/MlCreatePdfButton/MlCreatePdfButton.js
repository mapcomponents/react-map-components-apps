import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "@mapcomponents/react-maplibre";

import createPdf from "./createPdf";

import Button from "@mui/material/Button";

import theme from "../../../theme";

/**
 * Renders a button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 *
 * @component
 */
const MlCreatePdfButton = (props) => {
  const mapContext = useContext(MapContext);
  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        style={{
          backgroundColor: theme.palette.blue,
          color: "white",
          float: "right",
          marginBottom: "20px",
        }}
        onClick={() => {
          createPdf(mapRef.current, null, () => {});
        }}
      >
        Drucken
      </Button>
    </>
  );
};

MlCreatePdfButton.defaultProps = {
  mapId: undefined,
};

MlCreatePdfButton.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
};

export default MlCreatePdfButton;
