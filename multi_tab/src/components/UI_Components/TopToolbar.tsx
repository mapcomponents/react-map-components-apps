import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {DataContext} from "../../contexts/DataContext";

export interface TopToolbarProps {
    children?: React.ReactNode;
    unmovableButtons?: React.ReactNode;
    buttons?: React.ReactNode;
    logo?: React.ReactNode;
    selectedLayer: string;
    setSelectedLayer: (layer: string) => void;
    tableSplit: boolean;
    setTableSplit: (split: boolean) => void;
}

const ghPagesUrl = 'https://mapcomponents.github.io/react-map-components-maplibre/';
const logoUrl = ghPagesUrl + 'assets/WG-MapComponents-Logo_rgb.svg';

function TopToolbar(props: TopToolbarProps) {
    const data = useContext(DataContext);

    const layers = data
        ? Object.keys(data).map(layerName => layerName.replace(".json", ""))
        : [];

    const handleLayerSelect = (event: SelectChangeEvent) => {
        props.setSelectedLayer(event.target.value as string);
    }

    const handleTableSplit = () => {
        const newTableSplit = !props.tableSplit;
        props.setTableSplit(newTableSplit);
    }

    return (
        <AppBar
            sx={{
                minHeight: '62px',
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 1300,
                top: 0,
            }}
        >
            <Toolbar disableGutters>
                {props.logo ? (
                    props.logo
                ) : (
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
                            alt={"WhereGroupLogo"}
                        />
                        {layers.length > 0 ? (
                            <Select
                                variant={'outlined'}
                                value={props.selectedLayer}
                                onChange={handleLayerSelect}
                            >
                                <MenuItem value={"all"}>all</MenuItem>
                                {layers.map(layerName => (
                                    <MenuItem value={layerName} key={layerName}>{layerName}</MenuItem>
                                ))}
                            </Select>
                        ) : (
                            <Typography variant="body1" >
                                No layers available
                            </Typography>
                        )}

                        {props.selectedLayer === 'all' && (
                            <Button
                                variant={'outlined'}
                                onClick={handleTableSplit}
                            >
                                {props.tableSplit ? ("merge table") : ("split table")}
                            </Button>
                        )}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopToolbar;
