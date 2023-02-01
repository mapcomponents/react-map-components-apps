import * as React from "react";
import { useState } from "react";
import {
   List,
   ListItemButton,
   ListItemText,
   Collapse,
   Grid,
   useMediaQuery,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function FeatureInfo(props) {
   const mediaIsMobile = useMediaQuery("(max-width:900px)");

   const [openLocation, setOpenLocation] = useState(true);
   const [openInfo, setOpenInfo] = useState(true);

   const handleClick1 = () => {
      setOpenLocation(!openLocation);
   };
   const handleClick2 = () => {
      setOpenInfo(!openInfo);
   };

   return (
      <List
         sx={{
            width: "100%",
            maxWidth: 360,
            backgroundColor: "#353535",
            color: "white",
         }}
         component="nav"
         aria-labelledby="nested-list-subheader"
      >
         <ListItemButton onClick={handleClick2}>
            <ListItemText primary="Info" />
            {openInfo ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         <Collapse in={openInfo} timeout="auto" unmountOnExit>
            <Grid paddingLeft={mediaIsMobile ? 1.4 : 5} paddingRight={1}>
               <List component="div">
                  <ListItemText>
                     Resource Type: <br />
                     {props.feature?.properties.primary_fuel} <br />
                     Production Capacity [mw]:{" "}
                     {props.feature?.properties.capacity_mw} <br />
                     Year of Commision:{" "}
                     {props.feature?.properties.commissioning_year
                        ? parseInt(props.feature?.properties.commissioning_year)
                        : "unkown"}{" "}
                     <br />
                  </ListItemText>
               </List>
            </Grid>
         </Collapse>

         <ListItemButton onClick={handleClick1}>
            <ListItemText primary="Location" />
            {openLocation ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         <Collapse in={openLocation} timeout="auto" unmountOnExit>
            <Grid paddingLeft={mediaIsMobile ? 1.4 : 5} paddingRight={1}>
               <List component="div">
                  <ListItemText>
                     Country: {props.feature?.properties.country_long} <br />
                     <br />
                     Latitude: {props.feature?.properties.latitude} <br />
                     Longitude: {props.feature?.properties.longitude} <br />
                  </ListItemText>
               </List>
            </Grid>
         </Collapse>
      </List>
   );
}
