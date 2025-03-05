import {Box, Button, Slider, Switch, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Sidebar, TopToolbar} from "@mapcomponents/react-maplibre";

export default function PointCloudSettings(props) {
    const [pointSize, setPointSize] = useState(2);
    const [light, setLight] = useState(true);
    const [intensity, setIntensity] = useState(1.7);
    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    const processChange = debounce(() => saveData());

    const saveData = () => {
        props.setPointSize(pointSize);
        props.setLight(light);
        props.setIntensity(intensity);
        props.setRed(red);
        props.setGreen(green);
        props.setBlue(blue);
    }

    useEffect(() => {
        processChange();
    }, [pointSize, light, intensity, red, green, blue]);

    return (
        <>
            <TopToolbar buttons={
                <Button
                    variant={sidebarOpen ? "outlined" : "contained"}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >PointCloud settings</Button>
            }/>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
                <Box
                    sx={{
                        marginTop: '20px',
                    }}
                >
                    {/* Headline */}
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
                            marginBottom: '5px',
                        }}
                    >
                        PointCloud Settings
                    </Typography>
                    {/* PointSize */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                        }}
                    >
                        Point Size
                    </Typography>
                    <Slider
                        defaultValue={2}
                        onChange={(e) => {
                            setPointSize(e.target.value)
                        }}
                        aria-label="small"
                        valueLabelDisplay="auto"
                        max={10}
                        min={1}
                    />

                    {/* Light */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                        }}
                    >
                        Light
                    </Typography>
                    <Switch
                        defaultChecked
                        onChange={(e) => {
                            setLight(e.target.checked)
                        }}
                    />

                    {/* Lightintensity */
                        light &&
                        <>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1rem',
                                }}
                            >
                                Light intensity
                            </Typography>
                            <Slider
                                defaultValue={1.7}
                                onChange={(e) => {
                                    setIntensity(e.target.value)
                                }}
                                aria-label="small"
                                valueLabelDisplay="auto"
                                min={0}
                                max={3}
                                step={0.1}
                            />
                        </>

                    }

                    {/* Color */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                        }}
                    >
                        Color
                    </Typography>

                    {/* red */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                width: '10px',
                                fontSize: '1rem',
                            }}
                        >
                            R:
                        </Typography>
                        <Slider
                            sx={{
                                left: '5%',
                                width: '92%',
                            }}
                            onChange={(e) => {
                                setRed(e.target.value)
                            }}
                            defaultValue={255}
                            aria-label="small"
                            valueLabelDisplay="auto"
                            min={0}
                            max={255}
                            step={1}
                        />
                    </Box>

                    {/* green */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                width: '10px',
                                fontSize: '1rem',
                            }}
                        >
                            G:
                        </Typography>
                        <Slider
                            sx={{
                                left: '5%',
                                width: '92%',
                            }}
                            defaultValue={255}
                            onChange={(e) => {
                                setGreen(e.target.value)
                            }}
                            aria-label="small"
                            valueLabelDisplay="auto"
                            min={0}
                            max={255}
                            step={1}
                        />
                    </Box>

                    {/* blue */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                width: '10px',
                                fontSize: '1rem',
                            }}
                        >
                            B:
                        </Typography>
                        <Slider
                            sx={{
                                left: '5%',
                                width: '92%',
                            }}
                            onChange={(e) => {
                                setBlue(e.target.value)
                            }}
                            defaultValue={255}
                            aria-label="small"
                            valueLabelDisplay="auto"
                            min={0}
                            max={255}
                            step={1}
                        />
                    </Box>
                </Box>
            </Sidebar>
        </>
    )
        ;
}