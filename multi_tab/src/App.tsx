import "./App.css";
import {MapLibreMap, TopToolbar} from "@mapcomponents/react-maplibre";
import LayerManager from "./components/LayerManager.jsx";
import {Button} from "@mui/material";
import {useState} from "react";

function App() {
    const [openSidebar, setOpenSidebar] = useState(true);

    const openTable = () => {
        const newUrl = `${window.location.href}#/table`;
        window.open(newUrl, "_blank", "popup");
    }
    return (
        <>
            <TopToolbar buttons={
                <>
                    <Button
                        sx={{
                            color: openSidebar ? "#009EE0" : "white",
                            backgroundColor: openSidebar ? "#fff" : '#009EE0',
                            marginRight: {xs: '0px', sm: '10px'}
                        }}
                        variant={openSidebar ? 'outlined' : 'contained'}
                        onClick={() => {
                            setOpenSidebar(!openSidebar);
                        }}
                    >
                        Sidebar
                    </Button>

                    <Button
                        sx={{
                            background: '#009EE0'
                        }}
                        variant='contained'
                        onClick={() => openTable()}
                    >show table</Button>
                </>
            }/>
            <MapLibreMap
                options={{
                    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
                    zoom: 12.75,
                    center: [7.1, 50.73],
                }}
                style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}
            />
            <LayerManager setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
        </>
    );
}

export default App;