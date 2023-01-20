import * as React from "react";
import { useCallback } from "react";
import {
   Button,
   ButtonGroup,
   Typography,
   useMediaQuery,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const references = [
   { fuel: "Biomass", color: "#109540" },
   { fuel: "Coal", color: "#5c4033" },
   { fuel: "Gas", color: "#a450ff" },
   { fuel: "Geothermal", color: "#ee9000" },
   { fuel: "Hydro", color: "#0202ff" },
   { fuel: "Oil", color: "#010101" },
   { fuel: "Nuclear", color: "#ffff00" },
   { fuel: "Solar", color: "#92ff00" },
   { fuel: "Waste", color: "#aaaaaa" },
   { fuel: "Wind", color: "#50bbff" },
   { fuel: "Other", color: "#fff" },
];

export default function Legend(props) {
   const mediaIsMobile = useMediaQuery("(max-width:900px)");
   const mediaIsLandscape = useMediaQuery("(max-height: 562px)");

   const getHandleClickFunction = useCallback(
      (fuel) => (e) => {
         let memory = [...props.toShow];

         const index = memory.indexOf(fuel);
         if (index > -1) {
            memory.splice(index, 1);
         } else {
            memory.push(fuel);
         }
         props.setToShow(memory);
         console.log(props.toShow);
      },
      [props]
   );

   function handleShowAll() {
      props.setToShow([
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
   }

   const Buttons = () => {
      return references.map((el) => (
         <Button
            style={
               mediaIsMobile
                  ? {
                       opacity: props.toShow.includes(el.fuel) ? 0.8 : 0.2,
                       backgroundColor: "#353535",
                       color: "white",
                       justifyContent: "left",
                       width: 105,
                       height: 22,
                    }
                  : {
                       opacity: props.toShow.includes(el.fuel) ? 0.8 : 0.2,
                       backgroundColor: "#353535",
                       color: "white",
                       justifyContent: "left",
                       width: 200,
                    }
            }
            key={el.fuel}
            onClick={getHandleClickFunction(el.fuel)}
         >
            <Typography
               variant={"h6"}
               sx={
                  mediaIsMobile
                     ? { paddingLeft: 3, fontSize: "10px" }
                     : { paddingLeft: 5 }
               }
            >
               {el.fuel}
            </Typography>
            <FiberManualRecordIcon
               sx={{ color: el.color, position: "absolute" }}
            />
         </Button>
      ));
   };

   return (
      <ButtonGroup
         orientation="vertical"
         aria-label="vertical outlined button group"
         variant="text"
         position="right"
      >
         <Buttons />
         {mediaIsLandscape ? (
            <></>
         ) : (
            <Button
               sx={
                  mediaIsMobile
                     ? {
                          width: 105,
                          height: 50,
                          paddingTop: 2,
                          fontSize: "10px",
                       }
                     : {}
               }
               onClick={handleShowAll}
            >
               {" "}
               Show all types{" "}
            </Button>
         )}
      </ButtonGroup>
   );
}
