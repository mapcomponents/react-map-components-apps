import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";

import { MlTransitionGeoJsonLayer, MlGeoJsonLayer, MlImageMarkerLayer, MlLayer, MlVectorTileLayer } from "@mapcomponents/react-maplibre";
import DailyProgressChart from "./assets/DailyProgressChart";
import StatsSidebar from "./assets/StatsSidebar";
import Header from "./assets/Header";
import Leaderboard from "./assets/Leaderboard";
import { MapContext } from "@mapcomponents/react-core"
import { MapLibreMap } from "@mapcomponents/react-maplibre"
import { AppContext } from "./assets/AppContext";
import { Grid, Paper, IconButton } from "@material-ui/core";
import _ from "lodash";
import germanyGeoJson from "./assets/json/germany.geo.json";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@material-ui/icons";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

import * as turf from "@turf/turf";

import colorTheme_default_raw from "./assets/themes/default";
import colorTheme_dark_raw from "./assets/themes/dark";
import layoutTheme_default from "./assets/themes/layoutTheme_default";

const baseTheme = layoutTheme_default;
const colorTheme_dark = createMuiTheme(
  _.merge({}, baseTheme, colorTheme_dark_raw)
);
const colorTheme_default = createMuiTheme(
  _.merge({}, baseTheme, colorTheme_default_raw)
);

const MlLaufwettbewerbApp = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const appContext = useContext(AppContext);

  const displayDateRef = useRef();
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const colorTheme = useMemo(() => {
    return responsiveFontSizes(
      appContext.darkMode ? colorTheme_dark : colorTheme_default
    );
  }, [appContext.darkMode]);
  useEffect(() => {

  },[]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    var bbox = turf.bbox(appContext.route);

    mapContext.getMap(props.mapId).fitBounds(
      [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ],
      { /*bearing: -42,*/ pitch: 45 }
    );

    setTimeout(() => {
      setShowProgress(true);
    },1000);

    //mapContext.getMap(props.mapId).setZoom(6.1);
    //mapContext
    //  .getMap(props.mapId)
    //  .setCenter({ lng: 9.830202291394698, lat: 50.55342033900138 });
  }, [mapContext.mapIds, mapContext,appContext.route, props.mapId, setShowProgress]);

  const setNextDisplayDate = useCallback(() => {
    let nextDateIndex =
      appContext.orderedDates.indexOf(displayDateRef.current) + 1;
    if (nextDateIndex < appContext.orderedDates.length) {
      displayDateRef.current = appContext.orderedDates[nextDateIndex];
      appContext.setDisplayDate(displayDateRef.current);
    } else {
      playingRef.current = false;
      setPlaying(false);
    }
  }, [appContext]);

  const playDisplayDates = useCallback(() => {
    setNextDisplayDate();
    setTimeout(() => {
      if (playingRef.current) {
        playDisplayDates();
        console.log('next display date');
      }
    }, 2000);
  }, [setNextDisplayDate]);

  useEffect(() => {
    if (playing) {
      displayDateRef.current = appContext.displayDate;
      let nextDateIndex =
        appContext.orderedDates.indexOf(displayDateRef.current) + 1;
      if (nextDateIndex >= appContext.orderedDates.length) {
        displayDateRef.current = appContext.orderedDates[0];
        appContext.setDisplayDate(displayDateRef.current);
      }
      playDisplayDates();
    }
  }, [playing,appContext.orderedDates]);



  return (
    <>
      <ThemeProvider theme={colorTheme}>
        <CssBaseline />
        <Grid
          container
          spacing={2}
          style={{ flexFlow: "column", flex: 1, flexWrap: "no-wrap" }}
        >
          <Grid item xs={12} style={{ flex: 0 }}>
            <Header />
          </Grid>
          <Grid item xs={12} style={{ flex: 1, display: "flex" }}>
            <Grid
              container
              spacing={2}
              style={{ flexDirection: "row", flex: 1 }}
            >
              <Grid item xs={12} md={3}>
                <StatsSidebar />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className="mlMap"
                style={{ minHeight: "500px", display: "flex" }}
              >
                <Paper
                  elevation={1}
                  style={{
                    backgroundColor: colorTheme.map.background.color,
                    flex: 1,
                    padding: 0,
                  }}
                >
                  <MapLibreMap
                    options={{
                      zoom: 6.5,
                      //style: "https://demotiles.maplibre.org/style.json",
                      attributionControl:true,
                      customAttribution: '<a href="https://WhereGroup.com">© WhereGroup</a> <a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
                      style: {
                        version: 8,
                        name: "Blank",
                        "maptiler_attribution":{"type":"vector","attribution":"<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>"},
                        center: [0, 0],
                        zoom: 0,
                        sources: {},
                        sprite:
                          "https://raw.githubusercontent.com/openmaptiles/osm-liberty-gl-style/gh-pages/sprites/osm-liberty",
                        glyphs:
                          "mapbox://fonts/openmaptiles/{fontstack}/{range}.pbf",
                        layers: [
                          {
                            id: "background",
                            type: "background",
                            paint: {
                              "background-color": "rgba(0,0,0,0)",
                            },
                          },
                        ],
                        id: "blank",
                      },
                      center: [7.0851268, 50.73884],
                    }}
                  />
                  {
                    // Add marker layers to be able to dynamically add layers below any of them to keep the right layer order
                    [
                      "vectortilesMarker",
                      "germanyGeojsonMarker",
                      "routeMarker",
                      "routeProgressMarker",
                      "currentPositionMarker",
                    ].map((el) => (
                      <MlLayer
                        key={"positionMarkerLayer" + el}
                        options={{
                          id: el,
                          type: "background",
                          paint: {
                            "background-color": "rgba(0,0,0,0)",
                          },
                        }}
                      />
                    ))
                  }
                  <MlVectorTileLayer
                    url={
                      "https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf"
                    }
                    layers={{
                      waterWay: {
                        type: "line",
                        "source-layer": "waterway",
                        layout: {
                          "line-cap": "round",
                          "line-join": "round",
                        },
                        paint: {
                          "line-opacity": colorTheme.map.water.opacity,
                          "line-color": colorTheme.map.water.color,
                          "line-width": 1,
                        },
                      },
                      water: {
                        type: "fill",
                        "source-layer": "water",
                        paint: {
                          "fill-opacity": colorTheme.map.water.opacity,
                          "fill-color": colorTheme.map.water.color,
                        },
                      },
                      highway: {
                        type: "line",
                        "source-layer": "transportation",
                        layout: {
                          "line-cap": "round",
                          "line-join": "round",
                        },
                        paint: {
                          "line-opacity": colorTheme.map.highway.opacity,
                          "line-color": colorTheme.map.highway.color,
                          "line-width": 1,
                        },
                      },
                    }}
                    sourceOptions={{
                      minzoom: 0,
                      maxzoom: 20,
                    }}
                    insertBeforeLayer={"vectortilesMarker"}
                  />

                  <MlTransitionGeoJsonLayer
                    geojson={germanyGeoJson}
                    idSuffix="germanyGeoJsonFill"
                    paint={{
                      "fill-color": colorTheme.map.countryGeojson.fillColor,
                      "fill-opacity": colorTheme.map.countryGeojson.fillOpacity,
                    }}
                    type="fill"
                    insertBeforeLayer={"germanyGeojsonMarker"}
                  />
                  <MlTransitionGeoJsonLayer
                    geojson={germanyGeoJson}
                    idSuffix="germanyGeoJsonLine"
                    paint={{
                      "line-color": colorTheme.map.countryGeojson.lineColor,
                      "line-opacity": colorTheme.map.countryGeojson.lineOpacity,
                      "line-width": colorTheme.map.countryGeojson.lineWidth,
                    }}
                    type="line"
                    insertBeforeLayer={"germanyGeojsonMarker"}
                  />
                  <MlGeoJsonLayer
                    geojson={appContext.route}
                    idSuffix="routeGeoJson"
                    paint={{
                      "line-color": colorTheme.map.route.lineColor,
                      "line-opacity": colorTheme.map.route.lineOpacity,
                      "line-width": colorTheme.map.route.lineWidth,
                    }}
                    type="line"
                    insertBeforeLayer={"routeMarker"}
                  />
                  { appContext.goalMarkerPosition && (console.log(appContext.goalMarkerPosition) || true) && 
                    <MlImageMarkerLayer
                      idSuffix="goalMarkerPositionGeoJson"
                      imgSrc="/assets/ziel.png"
                      options={{
                        type: "symbol",
                        source: {
                          type: "geojson",
                          data: appContext.goalMarkerPosition,
                        },
                        layout: {
                          "icon-allow-overlap": true,
                          "icon-size": 0.14,
                          "icon-offset": [0, -180],
                        },
                      }}
                      insertBeforeLayer={"currentPositionMarker"}
                    />
                  }
                  { showProgress && appContext.routeProgressFeature && (
                    <MlTransitionGeoJsonLayer
                      geojson={appContext.routeProgressFeature}
                      idSuffix="progressGeoJson"
                      paint={{
                        "line-color": colorTheme.map.routeProgress.lineColor,
                        "line-opacity":
                          colorTheme.map.routeProgress.lineOpacity,
                        "line-width": colorTheme.map.routeProgress.lineWidth,
                      }}
                      type="line"
                      transitionTime={1500}
                      onTransitionEnd={(data) => {
                        if(data && data.geometry){
                          appContext.setRouteProgressPosition({
                            type: "FeatureCollection",
                            features: [
                              {
                                type: "Feature",
                                properties: {
                                  description: "RouteProgressMarker",
                                },
                                geometry: {
                                  type: "Point",
                                  coordinates:
                                  data.geometry.coordinates[
                                    data.geometry.coordinates
                                    .length - 1
                                  ],
                                },
                              },
                            ],
                          });
                        }
                      }}
                      insertBeforeLayer={"routeProgressMarker"}
                    />
                  )}
                  {showProgress && appContext.routeProgressPosition && (
                    <MlImageMarkerLayer
                      geojson={appContext.routeProgressPosition}
                      idSuffix="progressPositionGeoJson"
                      imgSrc="/assets/marker.png"
                      options={{
                        type: "symbol",
                        source: {
                          type: "geojson",
                          data: {
                            ...appContext.routeProgressPosition,
                          },
                        },
                        layout: {
                          "icon-allow-overlap": true,
                          "icon-size": 0.03,
                          "icon-offset": [0, -350],
                        },
                      }}
                      insertBeforeLayer={"currentPositionMarker"}
                    />
                  )}
                  <MlLayer
                    idSuffix="CityLabels"
                    options={{
                      type: "symbol",
                      source: {
                        type: "geojson",
                        data: {
                          type: "FeatureCollection",
                          features: [
                            {
                              type: "Feature",
                              properties: {
                                description: "Bonn",
                              },
                              geometry: {
                                type: "Point",
                                coordinates: [
                                  7.085006973885085,
                                  50.738673903252966,
                                ],
                              },
                            },
                            {
                              type: "Feature",
                              properties: {
                                description: "Berlin",
                              },
                              geometry: {
                                type: "Point",
                                coordinates: [
                                  13.330454571384802,
                                  52.4928702653268,
                                ],
                              },
                            },
                            {
                              type: "Feature",
                              properties: {
                                description: "Freiburg",
                              },
                              geometry: {
                                type: "Point",
                                coordinates: [
                                  7.842812454054702,
                                  47.989065548092675,
                                ],
                              },
                            },
                          ],
                        },
                      },
                      layout: {
                        "text-field": ["get", "description"],
                        "text-radial-offset": 0.5,
                        "text-anchor": "bottom",
                        "text-offset": [0, -300],
                        "text-size": colorTheme.map.cityLabels.textSize,
                        "text-allow-overlap": true,
                      },
                      paint: {
                        "text-color": colorTheme.map.cityLabels.textColor,
                        "text-halo-color":
                          colorTheme.map.cityLabels.textHaloColor,
                        "text-halo-width":
                          colorTheme.map.cityLabels.textHaloWidth,
                      },
                    }}
                  ></MlLayer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} style={{ flex: "1", display: "flex" }}>
                <Paper elevation={1} style={{ flex: 1 }}>
                  <Leaderboard />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ flex: 0 }}>
            <Grid container spacing={2} style={{ display: "flex" }}>
              <Grid
                item
                xs={1}
                style={{
                  minHeight: "200px",
                  width: "100%",
                  display: "flex",
                }}
              >
                <Paper
                  elevation={1}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      displayDateRef.current = appContext.orderedDates[0];
                      appContext.setDisplayDate(displayDateRef.current);
                    }}
                    aria-label="first"
                  >
                    <SkipPrevious />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      playingRef.current = !playingRef.current;
                      setPlaying(playingRef.current);
                    }}
                    aria-label="play"
                  >
                    {!playing && <PlayArrow />}
                    {playing && <Pause />}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      displayDateRef.current =
                        appContext.orderedDates[
                          appContext.orderedDates.length - 1
                        ];
                      appContext.setDisplayDate(displayDateRef.current);
                    }}
                    aria-label="play"
                  >
                    <SkipNext />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid
                item
                xs={11}
                style={{
                  minHeight: "200px",
                  flex: 1,
                  display: "flex",
                  overflowX:'hidden',
                }}
              >
                <Paper elevation={1} style={{ flex: 1 }}>
                  <DailyProgressChart
                    data={appContext.progressDataByDate}
                    onClick={(date) => {console.log('click');appContext.setDisplayDate(date)}}
                    displayDate={appContext.displayDate}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default MlLaufwettbewerbApp;
