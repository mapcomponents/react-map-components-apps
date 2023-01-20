import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FeatureInfo from "./featureInfo.js";

const drawerWidth = 300;
const drawerHeight = 600;

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
   justifyContent: "flex-start",
}));

export default function Sidebar(props) {
   const mediaIsMobile = useMediaQuery("(max-width:900px)");
   const mediaIsLandscape = useMediaQuery("(max-height: 500px)");

   const theme = useTheme();

   return (
      <>
         <Drawer
            transitionDuration={800}
            sx={
               mediaIsMobile
                  ? {
                       width: drawerWidth,
                       maxWidth: "50%",
                       flexShrink: 0,

                       "& .MuiDrawer-paper": {
                          width: mediaIsLandscape
                             ? { width: 250 }
                             : { width: 200 },
                          height: mediaIsLandscape
                             ? { height: 305 }
                             : { height: 500 },
                          backgroundColor: "#353535",
                          color: "white",
                          opacity: 0.75,
                          marginTop: "80px",
                          right: 0,
                       },
                    }
                  : {
                       width: drawerWidth,
                       maxWidth: "50%",
                       flexShrink: 0,

                       "& .MuiDrawer-paper": {
                          width: drawerWidth,
                          height: drawerHeight,
                          backgroundColor: "#353535",
                          color: "white",
                          opacity: 0.75,
                          marginTop: "120px",
                          right: 10,
                       },
                    }
            }
            variant="persistent"
            anchor="right"
            open={props.open}
         >
            <DrawerHeader>
               <IconButton
                  style={{
                     position: "absolute",
                     marginTop: "15px",
                     backgroundColor: "#353535",
                     color: "white",
                     right: "0",
                  }}
                  onClick={props.closeHandler}
               >
                  {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
               </IconButton>
               <Typography variant={"body1"} paddingTop="5px">
                  {props.feature?.properties["name"]} <br />
                  {props.feature?.properties["country_long"]}
               </Typography>
            </DrawerHeader>
            <Divider />
            <FeatureInfo feature={props.feature} />
         </Drawer>
      </>
   );
}
