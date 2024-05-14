import { useMap, useLayerFilter } from "@mapcomponents/react-maplibre";
import { useEffect, useState } from "react";
import SearchLayer from "./searchLayer";
import Sidebar from "./Sidebar";
import ExtendLegend from "./extendLegend";
import { useParams } from "react-router-dom";

var selectedStateId = undefined;

const DataLayer = () => {
   const [open, setOpen] = useState(false);
   const mapHook = useMap({ mapId: "map_1" });
   const [selectedFeature, setSelectedFeature] = useState();
   const { searchWord } = useParams();
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

   const [plantData, setPlantData] = useState();

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
         centerTo(0, 0);
      }
   }, [searchWord, plantData, mapHook.map]);

   useLayerFilter({
      layerId: "Plant_data",
      filter: ["in", ["get", "primary_fuel"], ["literal", toShow]],
   });

   return (
      <>
         <SearchLayer />
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
