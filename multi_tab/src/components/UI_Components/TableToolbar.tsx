import * as React from 'react';
import {useContext} from 'react';
import {Button, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {DataContext} from "../../contexts/DataContext";
import {TopToolbar} from "@mapcomponents/react-maplibre";

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

function TableToolbar(props: TopToolbarProps) {
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
        <TopToolbar buttons={
            <>
                <Select
                    variant={'outlined'}
                    value={props.selectedLayer}
                    onChange={handleLayerSelect}
                    size={"small"}
                    sx={{
                        width: '122px',
                        marginRight: {xs: '0px', sm: '10px'}
                    }}
                >
                    <MenuItem value={"all"}>all</MenuItem>
                    {layers.map(layerName => (
                        <MenuItem value={layerName} key={layerName}>{layerName}</MenuItem>
                    ))}
                </Select>
                <Button
                    variant={'contained'}
                    onClick={handleTableSplit}
                    sx={{
                        backgroundColor: '#009EE0'
                    }}
                >
                    {props.tableSplit ? ("merge table") : ("split table")}
                </Button>
            </>
        }/>

    );
}

export default TableToolbar;
