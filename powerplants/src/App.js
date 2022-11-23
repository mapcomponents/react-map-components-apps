import "./App.css";
import { MapLibreMap, MlNavigationTools } from "@mapcomponents/react-maplibre";
import DataLayer from "./components/dataLayer";
import "maplibre-gl/dist/maplibre-gl.css";
import TopBar from "./components/TopBar";
import ChooseLayer from "./components/ChooseLayer";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Legend from "./components/Legend";

const theme = createTheme({
  palette: {
    primary: { main: "#353535" },
    secondary: { main: "#fafbfc" },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MapLibreMap
          mapId="map_1"
          options={{
            zoom: 1.8,
            style:
              "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
            center: [0, 0],
          }}
        />

        <TopBar />
        <ChooseLayer />
        <MlNavigationTools mapId="map_1" />

        <Routes>
          <Route
            path={"/:searchWord"}
            element={<DataLayer />}
          />
          <Route
            path={"*"}
            element={<DataLayer />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
