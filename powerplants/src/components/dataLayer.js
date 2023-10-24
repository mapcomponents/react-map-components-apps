import {
   MlGeoJsonLayer,
   useMap,
   useLayerFilter,
} from "@mapcomponents/react-maplibre";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import ExtendLegend from "./extendLegend";
import { useParams } from "react-router-dom";

var selectedStateId = undefined;

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

   const [plantData, setPlantData] = useState();

   useEffect(() => {
      fetch("assets/Plant_data.json")
         .then(function (response) {
            return response.json();
         })
         .then(function (json) {
            console.log(json);
            setPlantData(json);
         });
   }, []);

   useEffect(() => {
      if (!plantData?.features || !mapHook.map) return;
      function searchFunction() {
         let filtered = plantData.features.filter((item) => {
            return item.properties.country_long
               .toUpperCase()
               .includes(searchWord.toUpperCase());
         });
         setSearchResult(filtered);

         if (filtered.length > 0) {
            let num = Math.ceil(filtered.length / 2);
            console.log(num);
            mapHook.map.map.flyTo({
               center: [
                  filtered[num].properties.longitude,
                  filtered[num].properties.latitude,
               ],
               zoom: 4,
            });
         } else {
            filtered = plantData.features.filter((item) => {
               return item.properties.name
                  .toUpperCase()
                  .includes(searchWord.toUpperCase());
            });
            setSearchResult(filtered);
            console.log(filtered);

            if (filtered.length > 0) {
               mapHook.map.map.flyTo({
                  center: [
                     filtered[0].properties.longitude,
                     filtered[0].properties.latitude,
                  ],
                  zoom: 6,
               });
            }
         }
      }
      if (searchWord !== undefined) {
         searchFunction();
      } else {
         setSearchResult(undefined);
         centerTo(0, 0);
      }
   }, [searchWord, plantData, mapHook.map]);

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
         setBbox(result_json);
         return result_json;
      } else {
         return plantData;
      }
   }, [searchResult, searchWord, plantData]);

   function centerTo(lati, longi) {
      if (lati === 0 && longi === 0) {
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

   useLayerFilter({
      layerId: "Plant_data",
      filter: ["in", ["get", "primary_fuel"], ["literal", toShow]],
   });

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
               } 
            }}
            paint={{
               "circle-color": {
                  property: "primary_fuel",
                  type: "categorical",
                  default: "#fff",
                  stops: [
                     ["Biomass", "#109540"],
                     ["Coal", "#5c4033"],
                     ["Gas", "#a450ff"],
                     ["Geothermal", "#ee9000"],
                     ["Hydro", "#0202ff"],
                     ["Oil", "#000"],
                     ["Nuclear", "#ffff00"],
                     ["Solar", "#92ff00"],
                     ["Waste", "#999999"],
                     ["Wind", "#50bbff"],
                     ["Other", "#fff"],
                  ],
               },

               "circle-stroke-color": [
                  "case",
                  ["boolean", ["feature-state", "selected"], false],
                  [
                     "case",
                     ["==", ["get", "primary_fuel"], "Oil"],
                     "grey",
                     "black",
                  ],
                  "silver",
               ],
               "circle-stroke-width": [
                  "case",
                  ["boolean", ["feature-state", "selected"], false],
                  7,
                  0.5,
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
            }}
         />

         <ExtendLegend toShow={toShow} setToShow={setToShow} />
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
