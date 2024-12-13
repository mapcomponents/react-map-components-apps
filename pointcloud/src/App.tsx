import "./App.css";
import {MapLibreMap, MlNavigationTools} from "@mapcomponents/react-maplibre";
import LasLayer from "./LasLayer.jsx";

function App() {
    return (
        <>
            <MapLibreMap
                options={{
                    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
                    zoom: 10,
                    maxZoom: 24,
                    center: [7.842609, 47.997791],
                    pitch: 60,
                    bearing: 188
                }}
                style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}
            />
            <LasLayer/>
            {/*<MlFillExtrusionLayer
                paint={{
                    "fill-extrusion-color": "hsla(196,61%,83%,0)",
                    "fill-extrusion-height": {
                        property: "render_height",
                        type: "identity",
                    },
                    "fill-extrusion-base": {
                        property: "render_min_height",
                        type: "identity",
                    },
                    "fill-extrusion-opacity": 0.1,
                }}/>*/}
            <MlNavigationTools showFollowGpsButton={false}></MlNavigationTools>
        </>
    );
}

export default App;