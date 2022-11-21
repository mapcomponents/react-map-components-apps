import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { AppBar, Button, ButtonGroup, Typography } from "@mui/material";
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
  /* var [toShow, setToShow] = useState([
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
   ]); */

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

  const inTheList = (fuel) => {
    if (props.toShow.includes(fuel)) {
      return true;
    } else {
      return false;
    }
  };

  const Buttons = () => {
    return references.map((el) => (
      <Button
        style={{
          opacity: props.toShow.includes(el.fuel) ? 0.8 : 0.2,
          backgroundColor: "#353535",
          color: "white",
          justifyContent: "left",
          width: 200,
        }}
        key={el.fuel}
        onClick={getHandleClickFunction(el.fuel)}
      >
        <Typography sx={{ paddingLeft: 5 }}>
          {el.fuel}
        </Typography>
        <FiberManualRecordIcon sx={{ color: el.color, position: "absolute" }} />
      </Button>
    ));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        borderStyle: "hidden",
        backgroundColor: "transparent",
        top: 100,
        bottom: "auto",
        left: 20,
        width: 200,
        height: 405,
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        variant="text"
        position="right"
      >
        <Buttons />
        <Button onClick={handleShowAll}> Show all types </Button>
      </ButtonGroup>
    </AppBar>
  );
}
