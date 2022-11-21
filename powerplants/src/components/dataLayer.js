import { MlGeoJsonLayer, useMap } from "@mapcomponents/react-maplibre";
import { useEffect, useMemo, useState } from "react";
import Plant_data from "../assets/Plant_data.json";
import Sidebar from "./Sidebar";
import Legend from "./Legend";
import { useParams } from "react-router-dom";
import * as turf from "@turf/turf";

var selectedStateId = undefined;

const references = [
  { fuel: "Biomass", color: "#109540" },
  { fuel: "Coal", color: "#5c4033" },
  { fuel: "Gas", color: "#a450ff" },
  { fuel: "Geothermal", color: "#ee9000" },
  { fuel: "Hydro", color: "#0202ff" },
  { fuel: "Oil", color: "#000" },
  { fuel: "Nuclear", color: "#ffff00" },
  { fuel: "Solar", color: "#92ff00" },
  { fuel: "Waste", color: "#999999" },
  { fuel: "Wind", color: "#50bbff" },
  { fuel: "Other", color: "#fff" },
];

const DataLayer = () => {
  const [open, setOpen] = useState(false);
  const mapHook = useMap({ mapId: "map_1" });
  const [selectedFeature, setSelectedFeature] = useState();
  const { searchWord } = useParams();
 const [bbox, setBbox] = useState([-179.984, -62.877, 180, 73.122]);
  var result_json = {};
  const [toShow, setToShow] = useState([
    "Biomass",
    "Coal",
    "Gas",
    "Geothermal",
    "Hydro",
    "Nuclear",
    "Oil",
    "Solar",
    "Waste",
    "Wind",
    "Other",
  ]);

  let [searchResult, setSearchResult] = useState();


  const circleColorStops = useMemo(() => {
    return references.map((el) => {
      return [
        el.fuel,
        toShow.indexOf(el.fuel) === -1 ? "rgba(0,0,0,0)" : el.color,
      ];
    });
  }, [toShow]);

  useEffect(() => {
    function searchFunction() {
      let filtered = Plant_data.features.filter((item) => {
        return item.properties.country_long
          .toUpperCase()
          .includes(searchWord.toUpperCase());
      });
      setSearchResult(filtered);
     
      if (filtered.length > 0) { 
         let num = Math.ceil(filtered.length/2);
         console.log(num);
       mapHook.map.map.flyTo({
         center: [filtered[num].properties.longitude, filtered[num].properties.latitude],
         zoom: 4,
       })
      }

    }
    if (searchWord === undefined) {
      setSearchResult(Plant_data.features);
      centerTo(0, 0);
    } else if (searchWord !== undefined) {
      searchFunction();
    }
  }, [searchWord]);




  //  useEffect(() => {
  //    if (selectedFeature !== undefined) {
  //      centerTo(
  //        selectedFeature.properties.latitude,
  //        selectedFeature.properties.longitude
  //      );
  //    } else {
  //      if (result_json.features === undefined) {
  //        result_json.bbox = [-179.984, -62.877, 180, 73.122];
  //        mapHook.map?.map.fitBounds(result_json.bbox);
  //      } else if (result_json.features.length == 0) {
  //        result_json.bbox = [-179.984, -62.877, 180, 73.122];
  //        mapHook.map?.map.fitBounds(result_json.bbox);
  //      } else if (result_json.features.length === 1) {
  //        result_json.bbox = [
  //          [result_json.features[0].properties.longitude - 0.75],
  //          [result_json.features[0].properties.latitude - 0.75],
  //          [result_json.features[0].properties.longitude + 0.75],
  //          [result_json.features[0].properties.latitude + 0.75],
  //        ];
  //        mapHook.map?.map.fitBounds(result_json.bbox);
  //      } else {
  //        result_json.bbox = turf.bbox(result_json);
  //        mapHook.map?.map.fitBounds(result_json.bbox);
  //      }
  //    }
  //  });

  const geojson = useMemo(() => {
    if (searchResult?.length > 0) {
      result_json.type = "FeatureCollection";
      result_json.name = "results";
      result_json.features = searchResult;
      result_json.bbox = bbox;
      result_json.crs = {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      };
      setBbox(result_json)
     return result_json;
    } else {
      return Plant_data;
    }
  }, [searchResult, searchWord]);

  function centerTo(lati, longi) {
    if (lati == 0 && longi == 0) {
      mapHook.map?.map.flyTo({
        center: [longi, lati],
        zoom: 2.0,
      });
    } else {
      mapHook.map.map.flyTo({
        center: [longi, lati],
        zoom: 7,
      });
    }
  }

  function unselect() {
    mapHook.map.setFeatureState(
      {
        source: "Plant_data",
        id: selectedStateId,
      },
      { selected: false }
    );
    selectedStateId = undefined;
  }

  return (
    <>
      <MlGeoJsonLayer
        type="circle"
        mapId="map_1"
        layerId="Plant_data"
        geojson={geojson}
        onClick={(ev) => {
          console.log("click");

          if (!selectedStateId && !selectedFeature) {
            selectedStateId = ev.features[0].id;
            setSelectedFeature(ev.features[0]);
            setOpen(true);
            mapHook.map.setFeatureState(
              {
                source: "Plant_data",
                id: selectedStateId,
              },
              { selected: true }
            );
            mapHook.map.map.flyTo({
              center: [
                ev.features[0].properties.longitude,
                ev.features[0].properties.latitude,
              ],
              zoom: 8,
            });
          } else if (selectedStateId !== ev.features[0].id) {
            unselect();
            setSelectedFeature(ev.features[0]);
            selectedStateId = ev.features[0].id;
            setOpen(true);
            mapHook.map.setFeatureState(
              {
                source: "Plant_data",
                id: selectedStateId,
              },
              { selected: true }
            );
            centerTo(
              ev.features[0].properties.latitude,
              ev.features[0].properties.longitude
            );
          } else if (selectedStateId === ev.features[0].id) {
            unselect();
            setOpen(false);
            centerTo(0, 0);
          }
        }}
        paint={{
          "circle-color": {
            property: "primary_fuel",
            type: "categorical",
            default: "#fff",
            stops: circleColorStops,
          },

          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            "black",
            "silver",
          ],
          "circle-stroke-width": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            4,
            0.2,
          ],

          "circle-radius": {
            property: "capacity_mw",
            stops: [
              [{ zoom: 2, value: 1 }, 2],
              [{ zoom: 2, value: 3000 }, 10],
              [{ zoom: 2, value: 22500 }, 23],
              [{ zoom: 16, value: 1 }, 10],
              [{ zoom: 16, value: 3000 }, 100],
              [{ zoom: 16, value: 22500 }, 230],
            ],
          },
          //"circle-opacity": ["case", filterKey, 0.7, 0],
          // "circle-stroke-opacity": ["case", filterKey, 0.8, 0],
        }}
      />
      <Legend toShow={toShow} setToShow={setToShow} />

      <Sidebar
        open={open}
        closeHandler={() => {
          setOpen(false);
          setSelectedFeature(undefined);
          mapHook.map.setFeatureState(
            {
              source: "Plant_data",
              id: selectedStateId,
            },
            { selected: false }
          );
          centerTo(0, 0);
        }}
        feature={selectedFeature}
      ></Sidebar>
    </>
  );
};
export default DataLayer;
