import {LayerList, Sidebar, useMap,} from "@mapcomponents/react-maplibre";
import ParkLayer from "./Layers/ParkLayer.tsx";
import {useContext, useEffect, useState} from "react";
import {sendMessageToServiceWorker} from "../js/sendMessageToSW";
import RestaurantLayer from "./Layers/RestaurantLayer.tsx";
import {DataContext} from "../contexts/DataContext.tsx";
import MlHighlightFeature from "./UI_Components/MlHighlightFeature.tsx";

const getCoordinates = (features, id, src) => {
    for (const feature of features) {
        if (id === feature.id) {
            if (src === 'restaurant.json') {
                return feature.geometry.coordinates;
            } else {
                const coordinates = feature.geometry.coordinates;
                return getAverageCoordinates(coordinates);
            }
        }
    }
    throw new Error(`Feature with id ${id} not found`);
}

const getAverageCoordinates = (coordinates) => {
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
        throw new Error("Invalid coordinates");
    }

    const x = [];
    const y = [];

    coordinates[0]?.forEach(([lon, lat]) => {
        x.push(lon);
        y.push(lat);
    });

    const averageX = x.reduce((sum, currentValue) => sum + currentValue, 0) / x.length;
    const averageY = y.reduce((sum, currentValue) => sum + currentValue, 0) / y.length;

    return [averageX, averageY];
};

const getSelectedFeature = (data, id) => {
    for (const object of Object.values(data)) {
        const feature = object.features.find((feature) => feature.id === id);
        if (feature) return feature;
    }
    return null;
};


export default function LayerManager(props) {
    const mapHook = useMap();

    const [selected, setSelected] = useState();
    const [selectedFeature, setSelectedFeature] = useState();
    const [src, setSrc] = useState(null);

    const data = useContext(DataContext);


    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const handleMessage = (event) => {
                if (event.data.type === "selectedFromDataTable") {
                    setSelected(event.data.message?.selected);
                    setSrc(event.data.message?.src);
                }
            };

            navigator.serviceWorker.addEventListener('message', handleMessage);

            return () => {
                navigator.serviceWorker.removeEventListener('message', handleMessage);
            };
        }
    }, [setSelected]);

    useEffect(() => {
        if (!mapHook.map || !selected) return;

        setSelectedFeature(getSelectedFeature(data, selected));

        const coordinates = getCoordinates(data[src]?.features, selected, src);
        const zoom = src === 'park.json' ? 15 : 17;

        mapHook.map.flyTo({center: coordinates, zoom: zoom});
        sendMessageToServiceWorker({
            type: "selectedFromLayerManager",
            message: {
                'selected': selected,
                'src': src
            }
        });

    }, [selected, src, mapHook.map, data]);

    useEffect(() => {
        if (!mapHook.map || !mapHook.map.getLayer('parks') || !mapHook.map.getLayer('restaurants')) return;

        const handleMove = () => {
            const featureIDList = [];

            const visibleFeatures = mapHook.map.queryRenderedFeatures({
                layers: ['parks', 'restaurants'],
            });

            visibleFeatures.forEach(visibleFeature => {
                const id = visibleFeature?.properties["@id"];
                if (id && !featureIDList.includes(id)) {
                    featureIDList.push(id);
                }
            });
            sendMessageToServiceWorker({
                type: "showObjects",
                message: featureIDList
            });
        };

        mapHook.map.on('moveend', handleMove);

        return () => {
            mapHook.map.off('moveend', handleMove);
        };
    }, [mapHook.map]);

    useEffect(() => {
        console.log("test")
        if (!mapHook.map) return;

        console.log({
            parksShown: mapHook.map.getLayer('parks').visibility === "visible",
            restaurantsShown: mapHook.map.getLayer('restaurants').visibility === "visible",
        })
        sendMessageToServiceWorker({
            type: "visibleLayers",
            message: {
                parksShown: mapHook.map.getLayer('parks').visibility === "visible",
                restaurantsShown: mapHook.map.getLayer('restaurants').visibility === "visible",
            }
        })
    }, [mapHook.map.style._layers.parks.visibility === "visible"]);
    return (
        <>
            <Sidebar open={props.openSidebar} setOpen={props.setOpenSidebar} name={"Layers"} >
                <LayerList>
                    <ParkLayer
                        selected={selected}
                        setSelected={setSelected}
                        setSrc={setSrc}
                    />
                    <RestaurantLayer
                        selected={selected}
                        setSelected={setSelected}
                        setSrc={setSrc}
                    />
                </LayerList>
            </Sidebar>
            {selectedFeature && <MlHighlightFeature features={[selectedFeature]} variant={"hell"} offset={1}/>}
        </>
    );
}
