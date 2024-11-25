import {AppBar, Box, Button, Slider, Switch, Typography} from "@mui/material";
import {useState} from "react";

export default function PointCloudSettings(props) {
    const [pointSize, setPointSize] = useState(2);
    const [light, setLight] = useState(true);
    const [intensity, setIntensity] = useState(1.7);
    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);

    const saveData = () => {
        props.setPointSize(pointSize);
        props.setLight(light);
        props.setIntensity(intensity);
        props.setRed(red);
        props.setGreen(green);
        props.setBlue(blue);
    }

    return (
        <>
            <AppBar
                position="fixed"
                elevation={3}
                sx={{
                    width: "20%",
                    margin: "10px",
                    paddingLeft: "25px",
                    paddingBottom: "25px",
                    paddingRight: "25px",
                    left: "0%",

                    zIndex: 1000,

                    backgroundColor: '#FFFFFFCC',
                    color: "black"
                }}
            >
                <Box
                    sx={{
                        marginTop: '20px',
                    }}
                >
                    {/* Headline */}
                    <Typography
                        variant="h4"
                    >
                        PointCloud Settings
                    </Typography>
                    <hr width='99%'/>

                    {/* PointSize */}
                    <Typography
                        variant="h6"
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
                    >
                        Light
                    </Typography>
                    <Switch
                        defaultChecked
                        onChange={(e) => {
                            setLight(e.target.checked)
                        }}
                    />

                    {/* Lightintensity */}
                    <Typography
                        variant="h6"
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

                    {/* Color */}
                    <Typography
                        variant="h6"
                    >
                        Color
                    </Typography>

                    {/* red */}
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                width: '10px',
                            }}
                        >
                            r:
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
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                width: '10px',
                            }}
                        >
                            g:
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
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                width: '10px',
                            }}
                        >
                            b:
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'right',
                            marginTop: "25px"
                        }}
                    >
                        <Button
                            variant="contained"
                            disabled={props.loading}
                            sx={{
                                color: 'white',
                            }}
                            onClick={() => saveData()}
                        >
                            Apply
                        </Button>
                    </Box>

                </Box>
            </AppBar>
        </>
    );
}