import { MlWmsLayer } from "@mapcomponents/react-maplibre";
import React, { useState } from "react";
import { useMediaQuery } from "@mui/material/";
import tonerpic from "../assets/tonerpic.png";
import terrainpic from "../assets/terrainpic.png";
import watercolorpic from "../assets/watercolorpic.jpg";
import WmsCarousel from "./carousel";
import ExtendBar from "./extendBar";

//change

const wmsOptions = [
   {
      title: "toner",
      image: tonerpic,
      link: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
   },
   {
      title: "terrain",
      image: terrainpic,
      link: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
   },
   {
      title: "watercolor",
      image: watercolorpic,
      link: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
   },
];

export default function ChooseLayer() {
   const [currentIndex, setCurrentIndex] = useState(1);
   const [showWMS, setShowWMS] = useState(wmsOptions[currentIndex].title);
   const [disableWms, setDisableWms] = useState(false);

   const mediaIsMobile = useMediaQuery("(max-width:900px)");

   const wmsSetter = (index) => {
      if (index === currentIndex) {
         if (disableWms) {
            setDisableWms(false);
         } else {
            setDisableWms(true);
         }
      } else {
         setCurrentIndex(index);
         setShowWMS(wmsOptions[index].title);
         setDisableWms(false);
      }
   };

   const WmsLayers = () => {
      return (
         <>
            {wmsOptions?.map((el, index) => {
               return (
                  <MlWmsLayer
                     key={el.title + "_" + index}
                     url={el.link}
                     visible={showWMS === el.title}
                     insertBeforeLayer="Plant_data"
                     urlParameters={{ layers: "" }}
                  />
               );
            })}
         </>
      );
   };

   return (
      <>
         {!disableWms && <WmsLayers />}
         {mediaIsMobile ? (
            <WmsCarousel options={wmsOptions} setter={wmsSetter} current={currentIndex} />
         ) : (
            <ExtendBar
               options={wmsOptions}
               setter={wmsSetter}
               current={currentIndex}
               disabled={disableWms}
            />
         )}
      </>
   );
}

