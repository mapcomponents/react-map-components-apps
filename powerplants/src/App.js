import "./App.css";
import { MapLibreMap, MlNavigationTools } from "@mapcomponents/react-maplibre";
import DataLayer from "./components/dataLayer";
import "maplibre-gl/dist/maplibre-gl.css";
import TopBar from "./components/TopBar";
import ChooseLayer from "./components/ChooseLayer";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { Route, Routes } from "react-router-dom";

const theme = createTheme({
   palette: {
      primary: { main: "#353535" },
      secondary: { main: "#fafbfc" },
   },
});

const pathname = window.location.pathname;

function App() {
   const mediaIsMobile = useMediaQuery("(max-width:900px)");

   return (
      <>
         <ThemeProvider theme={theme}>
            <MapLibreMap
               mapId="map_1"
               options={{
                  zoom: 1.8,
                  style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
                  center: [0, 0],
               }}
            />

            <TopBar />
            <ChooseLayer />
            {mediaIsMobile ? (
               <MlNavigationTools mapId="map1" showZoomButtons={false} />
            ) : (
               <MlNavigationTools mapId="map1" showZoomButtons={true} />
            )}

            <Routes>
               <Route path={pathname + ":searchWord"} element={<DataLayer />} />
               <Route path={pathname + ""} element={<DataLayer />} />
            </Routes>
         </ThemeProvider>
      </>
   );
}

export default App;
