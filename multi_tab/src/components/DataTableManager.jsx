import {Box} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import TopToolBar from "./UI_Components/TableToolbar.tsx";
import CreateTable from "./UI_Components/DataTable.jsx";
import {DataContext} from "../contexts/DataContext.tsx";

export default function DataTableManager() {
    const data = useContext(DataContext);

    const [visibleIDs, setVisibleIDs] = useState([]);
    const [selected, setSelected] = useState();
    const [selectedLayer, setSelectedLayer] = useState("all");
    const [tableSplit, setTableSplit] = useState(false);
    /*const [showOnlyVisibleObjects, setShowOnlyVisibleObjects] = useState(true);*/

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const handleMessage = (event) => {
                const {type, message} = event.data;
                switch (type) {
                    case "showObjects":
                        setVisibleIDs(message);
                        break;
                    case "selectedFromLayerManager":
                        setSelected(message.selected);
                        break;
                    case"visibleLayers":
                        console.log("got message")
                        setSelectedLayer(
                            message.parksShown && message.restaurantsShown
                                ? 'all'
                                : message.restaurantsShown
                                    ? 'restaurant'
                                    : message.parksShown
                                        ? 'park'
                                        : 'all'
                        );

                        break;
                    default:
                        console.warn(`Unhandled message type: ${type}`);
                }
            };

            navigator.serviceWorker.addEventListener('message', handleMessage);

            return () => {
                navigator.serviceWorker.removeEventListener('message', handleMessage);
            };
        }
    }, []);


    if (!data) {
        return <div>Loading data...</div>;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <TopToolBar selectedLayer={selectedLayer} setSelectedLayer={setSelectedLayer} tableSplit={tableSplit}
                        setTableSplit={setTableSplit}/>
            <Box sx={{flexGrow: 1, paddingTop: '62px'}}>
                {tableSplit ?
                    <>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            <Box
                                sx={{
                                    width: "calc(50vw - 10px)",
                                    height: "calc(100vh - 80px)",
                                }}>
                                <CreateTable
                                    data={data}
                                    visibleIDs={visibleIDs}
                                    selectedLayer={"park"}
                                    selected={selected}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: "calc(50vw - 10px)",
                                    height: "calc(100vh - 80px)",
                                }}>
                                <CreateTable
                                    data={data}
                                    visibleIDs={visibleIDs}
                                    selectedLayer={"restaurant"}
                                    selected={selected}
                                />
                            </Box>
                        </Box>
                    </> :
                    <CreateTable
                        data={data}
                        visibleIDs={visibleIDs}
                        selectedLayer={selectedLayer}
                        selected={selected}
                    />
                }
            </Box>
        </Box>
    );
}
