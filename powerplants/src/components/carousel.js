import React, { useEffect, useState } from "react";
import { Button, Box, Grid, useMediaQuery } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function WmsCarousel(props) {
  const [showIndex, setShowIndex] = useState(props.current);
  const mediaIsLandscape = useMediaQuery("(max-height: 562px)");

  useEffect(() => {
    if (props.current !== showIndex) {
      props.setter(showIndex);
    }
  }, [showIndex]);

  function clickLeft() {
    if (showIndex === 0) {
      setShowIndex(props.options.length - 1);
    } else {
      setShowIndex(showIndex - 1);
    }
  }

  function clickRight() {
    if (showIndex === props.options.length - 1) {
      setShowIndex(0);
    } else {
      setShowIndex(showIndex + 1);
    }
  }

  return (
     <>
        <Box
           sx={{
              position: "fixed",
              bottom: mediaIsLandscape ? 4 : 38,
              left: mediaIsLandscape ? 120 : 4,
              height: 100,
              width: 140,
              opacity: 0.8,
              zIndex: 110,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#353535",
           }}
        >
           <IconButton onClick={clickLeft}>
              <ArrowBackIosIcon color="secondary" />
           </IconButton>
           <Button onClick={() => props.setter(showIndex)}>
              <img
                 src={props.options[showIndex].image}
                 alt={props.options[showIndex].title}
                 style={{
                    width: 88,
                    height: 88,
                    opacity: 1,
                 }}
              />
           </Button>
           <IconButton onClick={clickRight}>
              <ArrowForwardIosIcon color="secondary" />
           </IconButton>
        </Box>
     </>
  );
}
