import "./App.css";
import { MapLibreMap } from "@mapcomponents/react-maplibre";
import LasLayer from "./LasLayer.jsx";

function App() {
  return (
    <>
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 10,
          maxZoom: 24,
          center: [7.1, 50.733334]
        }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <LasLayer/>
    </>
  );
}

export default App;