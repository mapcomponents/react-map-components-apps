import "./App.css";
import {MapLibreMap} from "@mapcomponents/react-maplibre";
import LayerManager from "./components/LayerManager.jsx";
import {Button} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {useState} from "react";

function App() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const ghPagesUrl = 'https://mapcomponents.github.io/react-map-components-maplibre/';
    const logoUrl = ghPagesUrl + 'assets/WG-MapComponents-Logo_rgb.svg';


    const openTable = () => {
        const newUrl = `${window.location.href}#/table`;
        window.open(newUrl, "_blank", "popup");
    }
    return (
        <>
            <AppBar
                sx={{
                    minHeight: '62px',
                    width: '100vw',
                    position: 'absolute',
                    backgroundColor: 'white',
                    zIndex: 1300,
                    top: 0,
                }}
            >
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            marginLeft: '25px',
                            display: {xs: 'none', md: 'flex'},
                            flexGrow: {md: '30'},
                        }}
                    >
                        <img
                            src={logoUrl}
                            style={{width: '100%', maxWidth: '250px'}}
                            alt={"MapComponentsLogo"}
                        />
                        <Button
                            sx={{
                                left: 'calc(100% - 520px)',
                                color: '#238ee5'
                            }}
                            disabled={openSidebar}
                            variant='outlined'
                            onClick={() => {
                                setOpenSidebar(!openSidebar);
                            }}
                        >
                            Open Sidebar
                        </Button>

                        <Button
                            sx={{
                                left: 'calc(100% - 510px)',
                                color: '#238ee5'
                            }}
                            variant='outlined'
                            onClick={() => openTable()}
                        >show table</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <MapLibreMap
                options={{
                    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
                    zoom: 12.75,
                    center: [7.1, 50.73],
                }}
                style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}
            />
            <LayerManager setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        </>
    );
}

export default App;