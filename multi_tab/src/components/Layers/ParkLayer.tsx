import {LayerListItem, MlGeoJsonLayer} from "@mapcomponents/react-maplibre";
import React, {useContext} from "react";
import {DataContext} from '../../contexts/DataContext';
import {FeatureCollection} from "@turf/turf";

interface ParkLayerProps {
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    setSrc: React.Dispatch<React.SetStateAction<string>>
}

// Function to initialize all parks to the map if the data is fetched successfully
export default function ParkLayer({
                                      setSelected,
                                      setSrc
                                  }: ParkLayerProps) {
    const src = "park.json";
    const data = useContext(DataContext);

    if (data && data[src]) return (
        <>
            <LayerListItem
                configurable={true}
                type="layer"
                layerId="park"
                name="Parks"
                layerComponent={
                    <MlGeoJsonLayer
                        layerId="parks"
                        geojson={data[src] as FeatureCollection}
                        onClick={(ev: any) => {
                            setSelected(ev?.features?.[0]?.properties['@id']);
                            setSrc(src);
                        }}
                        options={{
                            paint: {
                                "fill-color": "#388E3C",
                                "fill-outline-color": '#000',
                                "fill-opacity": 0.8,
                            },
                        }}
                        labelProp={"name"}
                    />
                }
            />
        </>
    );
}
