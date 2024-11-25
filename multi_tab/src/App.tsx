import "./App.css";
import { MapLibreMap } from "@mapcomponents/react-maplibre";
import LayerManager from "./components/LayerManager.jsx";
import { useState } from "react";
import { Button } from "@mui/material";

function App() {
  const [tableOpen, setTableOpen] = useState(false);


  const openTable = () => {
    if (!tableOpen) {
      const newUrl = `${window.location.href}table`;
      window.open(newUrl, "_blank", "popup");
      setTableOpen(true);
    }
  }
  return (
    <>
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 12.75,
          center: [7.1, 50.73],
        }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <LayerManager />
      <Button
        sx={{
          left: '93%'
        }}
        variant='contained'
        color="primary"
        onClick={() => openTable()}
      >show table</Button>
    </>
  );
}

export default App;