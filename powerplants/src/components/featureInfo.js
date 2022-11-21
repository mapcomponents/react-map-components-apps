import * as React from "react";
import { useState } from "react";
import {
   ListSubheader,
   List,
   ListItemButton,
   ListItemText,
   Collapse,
   Grid,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function FeatureInfo(props) {
   const [openLocation, setOpenLocation] = useState(false);
   const [openInfo, setOpenInfo] = useState(false);

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
         subheader={
            <ListSubheader
               component="div"
               id="nested-list-subheader"
               sx={{ backgroundColor: "#353535", color: "white" }}
            >
               Expand for more Information
            </ListSubheader>
         }
      >
         <ListItemButton onClick={handleClick2}>
            <ListItemText primary="Info" />
            {openInfo ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         <Collapse in={openInfo} timeout="auto" unmountOnExit>
            <Grid paddingLeft={5}>
               <List component="div">
                  <ListItemText>
                     Resource Type: {props.feature?.properties.primary_fuel}{" "}
                     <br />
                     Prduction Capacity [mw]:{" "}
                     {props.feature?.properties.capacity_mw} <br />
                     Year of Commision:{" "}
                     {props.feature?.properties.commissioning_year} <br />
                  </ListItemText>
               </List>
            </Grid>
         </Collapse>

         <ListItemButton onClick={handleClick1}>
            <ListItemText primary="Location" />
            {openLocation ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         <Collapse in={openLocation} timeout="auto" unmountOnExit>
            <Grid paddingLeft={5}>
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
