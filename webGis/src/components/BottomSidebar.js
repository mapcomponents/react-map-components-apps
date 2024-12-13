import * as React from "react";
import { Global } from "@emotion/react";
import { styled,  } from "@mui/material/styles";
import {
  Box,
  Typography,
  SwipeableDrawer,
  } from "@mui/material/";


const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "rgb(55, 55, 55)",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "rgb(55, 55, 55)",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "dark" ? "rgb(55, 55, 55)" : "#fff",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function Sidebar(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(30% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        hideBackdrop={true}
        //sx={{ pointerEvents: "none" }}
        ModalProps={{
          keepMounted: true,
          sx:{
            top: `calc(70%)`,
          }
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            color: "white",
            //pointerEvents: "all"
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "white" }}>Informationen</Typography>
        </StyledBox>

        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            color: "white",
            //pointerEvents: "all"
          }}
        >
          {props.children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default Sidebar;
