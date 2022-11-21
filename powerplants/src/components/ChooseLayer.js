import { MlWmsLayer } from "@mapcomponents/react-maplibre";
import { useState } from "react";
import { Button, ButtonGroup, AppBar, Grid } from "@mui/material/";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import tonerpic from "../assets/tonerpic.png";
import terrainpic from "../assets/terrainpic.png";
import watercolorpic from "../assets/watercolorpic.jpg";

export default function ChooseLayer() {
  const [terrain, setTerrain] = useState(true);
  const [toner, setToner] = useState(false);
  const [watercolor, setWatercolor] = useState(false);
  const [extended, setExtended] = useState(false);

  const terrainClick = () => {
    setToner(false);
    setWatercolor(false);
    setTerrain(!terrain);
  };
  const tonerClick = () => {
    setTerrain(false);
    setWatercolor(false);
    setToner(!toner);
  };
  const watercolorClick = () => {
    setToner(false);
    setTerrain(false);
    setWatercolor(!watercolor);
  };

  return (
     <>
        <MlWmsLayer
           url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
           visible={toner}
           insertBeforeLayer="Plant_data"
           urlParameters={{ layers: "" }}
        />
        <MlWmsLayer
           url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
           visible={terrain}
           insertBeforeLayer="Plant_data"
           urlParameters={{ layers: "" }}
        />
        <MlWmsLayer
           url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
           visible={watercolor}
           insertBeforeLayer="Plant_data"
           urlParameters={{ layers: "" }}
        />
        <AppBar
           position="fixed"
           sx={{
              top: "auto",
              bottom: 33,
              right: 100,
              width: extended ? 410 : 180,
              height: 115,
              opacity: 0.8,
           }}
        >
           <Grid container>
              <Grid>
                 <Button
                    sx={{ height: 115, paddingRight: 3 }}
                    onClick={() => setExtended(!extended)}
                 >
                    <DragHandleIcon
                       color="secondary"
                       sx={{ alignSelf: "center", transform: "rotate(90deg)" }}
                    />
                 </Button>
              </Grid>

              <Grid position="fixed" alignItems="flex-end" marginLeft={5}>
                 {!extended ? (
                    <ButtonGroup variant="text" color="secondary">
                       {toner && (
                          <Button onClick={tonerClick}>
                             {" "}
                             <img
                                src={tonerpic}
                                alt="toner layer"
                                style={{ width: 100, height: 100, opacity: 1 }}
                             />
                          </Button>
                       )}
                       {terrain && (
                          <Button onClick={terrainClick}>
                             {" "}
                             <img
                                src={terrainpic}
                                alt="terrain layer"
                                style={{ width: 100, height: 100, opacity: 1 }}
                             />
                          </Button>
                       )}

                       {watercolor && (
                          <Button onClick={watercolorClick}>
                             {" "}
                             <img
                                src={watercolorpic}
                                alt="watercolor layer"
                                style={{ width: 100, height: 100, opacity: 1 }}
                             />
                          </Button>
                       )}
                    </ButtonGroup>
                 ) : (
                    <>
                       <ButtonGroup variant="text" color="secondary">
                          <Button onClick={tonerClick}>
                             {toner ? (
                                <img
                                   src={tonerpic}
                                   alt="toner layer"
                                   style={{
                                      width: 100,
                                      height: 100,
                                      opacity: 1,
                                   }}
                                />
                             ) : (
                                <img
                                   src={tonerpic}
                                   alt="toner layer"
                                   style={{
                                      width: 100,
                                      height: 100,
                                      opacity: 0.5,
                                   }}
                                />
                             )}
                          </Button>
                          <Button onClick={terrainClick}>
                             {terrain ? (
                                <img
                                   src={terrainpic}
                                   alt="terrain layer"
                                   style={{
                                      width: 100,
                                      height: 100,
                                      opacity: 1,
                                   }}
                                />
                             ) : (
                                <img
                                   src={terrainpic}
                                   alt="terrain layer"
                                   style={{
                                      width: 100,
                                      height: 100,
                                      opacity: 0.5,
                                   }}
                                />
                             )}
                          </Button>
                          <Button onClick={watercolorClick}>
                             {watercolor ? (
                                <img
                                   src={watercolorpic}
                                   alt="watercolor layer"
                                   style={{
                                      width: 100,
                                      height: 100,
                                      opacity: 1,
                                   }}
                                />
                             ) : (
                                <img
                                   src={watercolorpic}
                                   alt="watercolor layer"
                                   style={{
                                      width: 100,
                                      height: 100,
                                      opacity: 0.5,
                                   }}
                                />
                             )}
                          </Button>
                       </ButtonGroup>
                    </>
                 )}
              </Grid>
           </Grid>
        </AppBar>
     </>
  );
}
