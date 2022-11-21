import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FeatureInfo from "./featureInfo.js";

const drawerWidth = 350;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Sidebar(props) {
  const theme = useTheme();

  return (
     <>
        <Drawer
           transitionDuration={800}
           sx={{
              width: drawerWidth,
              maxWidth: "50%",
              flexShrink: 0,

              "& .MuiDrawer-paper": {
                 width: drawerWidth,
                 backgroundColor: "#353535",
                 color: "white",
                 opacity: 0.75,
                 marginTop: "88px",
                 left: 10,
              },
           }}
           variant="persistent"
           anchor="bottom"
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
                 {theme.direction === "rtl" ? (
                    <ExpandLessIcon />
                 ) : (
                    <ExpandMoreIcon />
                 )}
              </IconButton>
              <Typography variant="body1">
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
