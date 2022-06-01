import React, {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useState,
} from "react";
import PropTypes from "prop-types";

import { MapContext } from "@mapcomponents/react-maplibre";
import { v4 as uuidv4 } from "uuid";

import { MlLayer, useWms, MlMarker } from "@mapcomponents/react-maplibre";

import NestedListItem from "./NestedListItem";

import AppContext from "../AppContext";

var originShift = (2 * Math.PI * 6378137) / 2.0;
const lngLatToMeters = function (
  lnglat,
  validate,
  accuracy = { enable: true, decimal: 1 }
) {
  var lng = lnglat.lng;
  var lat = lnglat.lat;
  var x = (lng * originShift) / 180.0;
  var y =
    Math.log(Math.tan(((90 + lat) * Math.PI) / 360.0)) / (Math.PI / 180.0);
  y = (y * originShift) / 180.0;
  if (accuracy.enable) {
    x = Number(x.toFixed(accuracy.decimal));
    y = Number(y.toFixed(accuracy.decimal));
  }
  return [x, y];
};

/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * TODO: EaseTo the extend offered by the WMS in a zoom level that is supported
 *
 * @component
 */
const MlWmsLoader = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const { capabilities, error, setUrl, getFeatureInfoUrl, wmsUrl } = useWms({
    url: undefined,
    urlParameters: props.urlParameters,
    username: props.username,
    password: props.password,
  });

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlWmsLoader-") + uuidv4()
  );
  const [layers, setLayers] = useState([]);

  const [featureInfoLngLat, setFeatureInfoLngLat] = useState(undefined);
  const [featureInfoContent, setFeatureInfoContent] = useState(undefined);

  const appContext = useContext(AppContext);

  useEffect(() => {
    //console.log("wms:" + wmsUrl + "ca" + capabilities + "er" + error);
  });

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource

      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;

    setUrl(props.url);
  }, [props.url]);

  const getFeatureInfo = useCallback(
    (ev) => {
      setFeatureInfoLngLat(undefined);
      setFeatureInfoContent(undefined);
      let _bounds = mapRef.current.getBounds();
      let _sw = lngLatToMeters(_bounds._sw);
      let _ne = lngLatToMeters(_bounds._ne);
      let bbox = [_sw[0], _sw[1], _ne[0], _ne[1]];
      let _getFeatureInfoUrlParams = {
        REQUEST: "GetFeatureInfo",

        BBOX: bbox.join(","),
        SERVICE: "WMS",
        INFO_FORMAT:
          capabilities?.Capability?.Request?.GetFeatureInfo.Format.indexOf(
            "text/html"
          ) !== -1
            ? "text/html"
            : "text/plain",
        FEATURE_COUNT: "10",
        LAYERS: layers
          .map((layer, idx) =>
            layer.Name
          )
          .filter((n) => n),
        QUERY_LAYERS: layers
          .map((layer, idx) =>
            layer.Name
          )
          .filter((n) => n),
        WIDTH: mapRef.current._container.clientWidth,
        HEIGHT: mapRef.current._container.clientHeight,
        STYLES: "",
        srs: "EPSG:3857",
        CRS: "EPSG:3857",
        version: "1.3.0",
        X: ev.point.x,
        Y: ev.point.y,
        I: ev.point.x,
        J: ev.point.y,
        buffer: "50",
      };

      let _gfiUrl = getFeatureInfoUrl;
      let _gfiUrlParts;
      if (_gfiUrl?.indexOf?.("?") !== -1) {
        _gfiUrlParts = props.url.split("?");
        _gfiUrl = _gfiUrlParts[0];
      }
      let _urlParamsFromUrl = new URLSearchParams(_gfiUrlParts?.[1]);

      //remove duplicate URL params as it might cause a ServiceException
      var keysToDelete = [];
      for (var key of _urlParamsFromUrl.keys()) {
        for (var key2 in props.urlParameters) {
          if (key.toLowerCase() == key2.toLowerCase()) {
            keysToDelete.push(key);
          }
        }
      }
      for (var key of keysToDelete) {
        _urlParamsFromUrl.delete(key);
      }

      let urlParamsObj = {
        ...Object.fromEntries(_urlParamsFromUrl),
        ..._getFeatureInfoUrlParams,
      };
      // create URLSearchParams object to assemble the URL Parameters
      let urlParams = new URLSearchParams(urlParamsObj);

      fetch(_gfiUrl + "?" + urlParams.toString())
        .then((res) => {
          if (!res.ok) {
            throw new Error("FeatureInfo could not be fetched");
          }
          return res.text();
        })
        .then((text) => {
          setFeatureInfoLngLat(ev.lngLat);
          setFeatureInfoContent(text);

          //Append result to AppContext state (using parameter to obtain previous state)
          if (wmsUrl != "") {
            appContext.setFeatureInfoContent((state) => ({
              ...state,
              [wmsUrl]: text,
            }));
          }
        })
        .catch((error) => console.log(error));
    },
    [capabilities, getFeatureInfoUrl, appContext.wmsOrGeoJSONVisible]
  );

  useEffect(() => {
    if (!mapRef.current) return;

    const _getFeatureInfo = getFeatureInfo;

    //remove listener if featureInfo mode has been toggled off
    if (!appContext.featureInfoEnabled) {
      mapRef.current?.off?.("click", _getFeatureInfo);
      return;
    }

    mapRef.current.on("click", _getFeatureInfo, componentId.current);

    //cleanup function of useEffect hook:
    return () => {
      mapRef.current?.off?.("click", _getFeatureInfo);
    };
  }, [getFeatureInfo, appContext.featureInfoEnabled]);

  useEffect(() => {
    if (!capabilities?.Service) return;

    if (capabilities?.Capability?.Layer?.SRS?.indexOf?.("EPSG:3857") === -1) {
      console.log(
        "MlWmsLoader (" +
          capabilities.Service.Title +
          "): No WGS 84/Pseudo-Mercator support"
      );
    } else {
      console.log(
        "MlWmsLoader (" +
          capabilities.Service.Title +
          "): WGS 84/Pseudo-Mercator supported"
      );

      let _LatLonBoundingBox;
      setLayers(
        capabilities?.Capability?.Layer?.Layer.map((layer, idx) => {
          if (idx === 0) {
            _LatLonBoundingBox = layer.LatLonBoundingBox;
            if (!_LatLonBoundingBox) {
              _LatLonBoundingBox = layer.EX_GeographicBoundingBox;
            }
          }
          layer.visible =
            capabilities?.Capability?.Layer?.Layer?.length > 2 ? idx > 1 : true;
          return layer;
        })
      );
    }
  }, [capabilities]);

  useEffect(() => {
    if (!mapContext?.mapExists?.(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    console.log("set url " + props.url);
    setUrl(props.url);
  }, [mapContext.mapIds, mapContext, props.mapId, props.url]);

  return (
    <>
      {/* {error && <p>{error}</p>} */}
      {console.log(componentId.current)}
      {capabilities?.Capability?.Layer?.Layer.map((layer, idx) => (
        <MlLayer
          layerId={"Order-" + componentId.current + "-" + idx}
          key={componentId.current + "-" + idx}
          {...(idx > 0
            ? {
                insertBeforeLayer:
                  "Order-" + componentId.current + "-" + (idx - 1),
              }
            : undefined)}
        />
      ))}
      <NestedListItem
        layers={layers}
        setLayers={setLayers}
        wmsUrl={wmsUrl}
        urlParams={props.wmsUrlParameters}
        capabilities={capabilities}
        componentId={componentId}
        open={props.open}
        handleClick={props.handleClick}
        id={props.id}
      ></NestedListItem>
    </>
  );
};

MlWmsLoader.defaultProps = {
  url: "",
  urlParameters: {
    SERVICE: "WMS",
    VERSION: "1.3.0",
    REQUEST: "getCapabilities",
  },
  wmsUrlParameters: {
    TRANSPARENT: "TRUE",
  },
};

MlWmsLoader.propTypes = {
  /**
   * WMS URL
   */
  url: PropTypes.string.isRequired,
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * URL parameters that will be used in the getCapabilities request
   */
  urlParameters: PropTypes.object,
  /**
   * URL parameters that will be added when requesting WMS capabilities
   */
  wmsUrlParameters: PropTypes.object,
  /**
   * URL parameters that will be added when requesting tiles
   */
  layerUrlParameters: PropTypes.object,
};

export default MlWmsLoader;
