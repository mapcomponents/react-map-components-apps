import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Grid, AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";

export default function SearchAppBar() {
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="fixed">
            <Toolbar>
               <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 51, display: { xs: "block", sm: "block" } }}
               >
                  Energy generation across the globe
               </Typography>
               <SearchBar />
            </Toolbar>
         </AppBar>
      </Box>
   );
}
