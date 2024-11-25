import {LayerListItem, MlGeoJsonLayer} from "@mapcomponents/react-maplibre";
import React, {useContext} from "react";
import {DataContext} from "../../contexts/DataContext";
import {FeatureCollection} from "@turf/turf";

interface RestaurantLayerProps {
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    setSrc: React.Dispatch<React.SetStateAction<string>>
}

// Function to initialize all restaurants to the map
export default function RestaurantLayer({
                                            setSelected,
                                            setSrc
                                        }: RestaurantLayerProps) {
    const src = "restaurant.json";
    const data = useContext(DataContext);

    if (data) return (
        <>
            <LayerListItem
                configurable={true}
                type="layer"
                layerId="restaurant"
                name="Restaurants"
                layerComponent={
                    <MlGeoJsonLayer
                        geojson={data[src] as FeatureCollection}
                        layerId="restaurants"
                        type="circle"
                        onClick={(ev:any) => {
                            setSelected(ev?.features[0].properties['@id']);
                            setSrc(src);
                        }}
                        options={{
                            paint: {
                                "circle-color": "#ffbf00",
                                "circle-opacity": 0.75,
                                "circle-stroke-color": '#000',
                                "circle-stroke-width": 1,
                                "circle-radius": 5
                            },
                        }}
                        labelProp={"name"}
                    />
                }
            />
        </>
    );
}
