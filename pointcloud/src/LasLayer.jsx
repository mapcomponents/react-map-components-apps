import React, {useEffect, useState} from "react";
import {MlFillExtrusionLayer, useMap} from "@mapcomponents/react-maplibre";
import {MapboxOverlay} from "@deck.gl/mapbox";
import {PointCloudLayer} from "@deck.gl/layers";
import {DirectionalLight, LightingEffect} from "@deck.gl/core";
import PointCloudSettings from "./PointCloudSettings";
import {CircularProgress} from "@mui/material";
import {useQuery} from "@tanstack/react-query";

const MlLasLayer = () => {

    //Variables to manipulate PointCloud
    const [pointSize, setPointSize] = useState(2);
    const [light, setLight] = useState(true);
    const [intensity, setIntensity] = useState(1.7);
    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);

    const [centerPointCloud, setCenterPointCloud] = useState();

    const [loading, setLoading] = useState(true);

    //saved PointCloud Object
    const [deckOverlay, setDeckOverlay] = useState();

    const mapHook = useMap();


    const fetchPointCloud = async () => {
        const response = await fetch("output_pointcloud.json");
        const data = await response.json();
        return data;
    }

    const {data, isLoading} = useQuery({
        queryKey: ["point-cloud"],
        queryFn: fetchPointCloud
    });

    //loads the point cloud from json on the map and saves in a var(deckOverlay) for better reloading
    const loadDataAndSetOverlay = () => {
        if (isLoading || !data?.positions) return;

        setLoading(true);
        try {
            const positions = data.positions;
            const normals = data.normals;
            const colors = data.colors;

            const directionalLight = new DirectionalLight({
                color: [red, green, blue],
                intensity: intensity,
                direction: [0, 0, 5.0],
                shadow: false,
            });

            const lightingEffect = new LightingEffect({directionalLight});

            const overlay = new MapboxOverlay({
                interleaved: true,
                layers: [
                    new PointCloudLayer({
                        id: "lasLayer",
                        data: positions.map((position, index) => ({
                            position,
                            normal: normals[index],
                            color: colors[index],
                        })),
                        getColor: (d) => d.color,
                        getNormal: (d) => d.normal,
                        getPosition: (d) => d.position,
                        pointSize: pointSize,
                    }),
                ],
                effects: light ? [lightingEffect] : [],
            });

            setCenterPointCloud([
                (positions[0][0] + positions[positions.length - 1][0]) / 2,
                (positions[0][1] + positions[positions.length - 1][1]) / 2,
            ]);

            if (deckOverlay) {
                mapHook.map.removeControl(deckOverlay);
            }

            mapHook.map.addControl(overlay);
            setDeckOverlay(overlay);
        } catch (error) {
            console.error("Fehler beim Laden der Punktwolke:", error);
        } finally {
            setLoading(false);
        }
    };


    //reloads map if settingsvalues change
    useEffect(() => {
        if (!mapHook.map) return;
        loadDataAndSetOverlay();

    }, [mapHook.map, pointSize, light, intensity, red, green, blue]);

    //cam flying in the center of any pointcloud
    useEffect(() => {
        if (mapHook.map && centerPointCloud) {
            mapHook.map.flyTo({center: centerPointCloud, zoom: 21});
            setLoading(false);
        }
    }, [centerPointCloud, mapHook.map]);

    return (
        <>
            {loading && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress size="80px"/>
                </div>
            )}
            <PointCloudSettings
                setPointSize={setPointSize}
                setLight={setLight}
                setIntensity={setIntensity}
                setRed={setRed}
                setGreen={setGreen}
                setBlue={setBlue}
                loading={loading}
            />
        </>
    );
};

export default MlLasLayer;