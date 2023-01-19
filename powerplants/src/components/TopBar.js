import * as React from "react";
import {  AppBar, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";

export default function SearchAppBar() {
   const mediaIsMobile = useMediaQuery("(max-width:900px)");
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="fixed">
            <Toolbar>
               <Typography
                  variant={mediaIsMobile ? "body2" : "h6"}
                  noWrap
                  component="div"
                  sx={{ flexGrow: 51, display: { xs: "block", sm: "block" } }}
               >
                  {mediaIsMobile
                     ? "Powerplants"
                     : "Energy generation across the globe"}
               </Typography>
               <SearchBar />
            </Toolbar>
         </AppBar>
      </Box>
   );
}
