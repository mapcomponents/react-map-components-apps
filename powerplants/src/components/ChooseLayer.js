import { useMap } from "@mapcomponents/react-maplibre";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material/";
import OSM_Fiordpic from "../assets/OSM_Fiordpic.png";
import OSM_Brightpic from "../assets/OSM_Brightpic.png";
import Medieval_kingdompic from "../assets/Medieval_kingdompic.png";
import WmsCarousel from "./carousel";
import DataLayer from "./dataLayer";
import ExtendBar from "./extendBar";
import OSM_Bright from "../assets/OSM_Bright.json";
import OSM_Fiord from "../assets/OSM_Fiord.json";
import Medieval_Kingdom from "../assets/medieval_kingdom.js";

const styleOptions = [
   { style: OSM_Bright, image: OSM_Brightpic, title: "Bright" },
   { style: OSM_Fiord, image: OSM_Fiordpic, title: "Fiord" },
   {
      style: Medieval_Kingdom,
      image: Medieval_kingdompic,
      title: "Medieval",
   },
];

export default function ChooseLayer() {
   const mapHook = useMap({ mapId: "map_1" });
   const [currentIndex, setCurrentIndex] = useState(1);
   const [disableWms, setDisableWms] = useState(false);
   const [mapReady, setMapReady] = useState(false);

   const mediaIsMobile = useMediaQuery("(max-width:900px)");

   useEffect(() => {
      styleOptions[currentIndex].style.layers.forEach((el) => {
         if (mapHook.map?.map.getLayer(el.id)) {
            mapHook.map?.removeLayer(el.id);
         }
         mapHook.map?.addLayer(el, "Plant_data");
         setMapReady(true);
      });
   }, [currentIndex, mapHook.map]);

   const wmsSetter = (index) => {
      if (index === currentIndex) {
         if (disableWms) {
            setDisableWms(false);
         } else {
            setDisableWms(true);
         }
      } else {
         setCurrentIndex(index);
         setDisableWms(false);
      }
   };

   return (
      <>
         {!disableWms}
         <DataLayer ready={mapReady} />
         {mediaIsMobile ? (
            <WmsCarousel
               options={styleOptions}
               setter={wmsSetter}
               current={currentIndex}
            />
         ) : (
            <ExtendBar
               options={styleOptions}
               setter={wmsSetter}
               current={currentIndex}
               disabled={disableWms}
            />
         )}
      </>
   );
}
