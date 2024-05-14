import React, { useEffect, useState } from "react";
import {
  AppBar,
  Grid,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import Legend from "./Legend";
export default function ExtendLegend(props) {
   const mediaIsMobile = useMediaQuery("(max-width:900px)");

   const [extended, setExtended] = useState(!mediaIsMobile);

   return (
      <AppBar
         position="fixed"
         sx={{
            borderStyle: "hidden",
            backgroundColor: "#353535",
            top: mediaIsMobile ? 70 : 90,
            left: mediaIsMobile ? 4 : 20,
            width: mediaIsMobile ? 105 : 200,
            height: mediaIsMobile ? 48 : 75,
            opacity: 0.8,
         }}
      >
         <Grid container>
            <Grid item xs={12}>
               <Typography
                  sx={{
                     fontSize: mediaIsMobile ? "10px" : "20px",
                     textAlign: "center",
                     paddingTop: "10px",
                  }}
               >
                  Fuel Types
               </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent={"center"}>
               <IconButton
                  sx={{
                     color: "white",
                     textAlign: "center",
                     paddingTop: 0,
                  }}
                  onClick={() => setExtended(!extended)}
               >
                  <MenuIcon fontSize={mediaIsMobile ? "small" : "large"} />
               </IconButton>
            </Grid>
            {extended && (
               <Legend toShow={props.toShow} setToShow={props.setToShow} />
            )}
         </Grid>
      </AppBar>
   );
}
