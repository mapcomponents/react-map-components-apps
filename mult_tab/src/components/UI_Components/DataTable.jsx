import React, {useMemo} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {sendMessageToServiceWorker} from "../../js/sendMessageToSW.js";

const createObjectList = (data, visibleIDs, selectedLayer) => {
    console.log(data);
    console.log(visibleIDs);
    console.log(selectedLayer);
    if (!data) return [];

    return Object.values(data).flatMap(value =>
        value.features.filter(feature => {
            const isVisible = visibleIDs.length === 0 || visibleIDs.includes(feature.id);
            const isCorrectLayer = selectedLayer === "all" || feature.properties.amenity === selectedLayer;
            return isVisible && isCorrectLayer;
        })
    );
};

const createPropertiesList = (objectList) => {
    if (!objectList) return [];
    const propertiesList = [];
    for (const object of Object.values(objectList)) {
        propertiesList.push(object.properties);
    }
    return propertiesList;
};

const createKeyList = (propertiesList) => {
    const keyFrequency = {};
    const minUsage = propertiesList.length < 4 ? 0 : 4;

    propertiesList.forEach(property => {
        Object.keys(property).forEach(key => {
            keyFrequency[key] = (keyFrequency[key] || 0) + 1;
        });
    });

    return Object.keys(keyFrequency)
        .filter(key => keyFrequency[key] >= minUsage)
        .sort();
};

const selecting = (id, src) => {
    sendMessageToServiceWorker({
        type: 'selectedFromDataTable',
        message: {
            "selected": id,
            "src": src
        }
    });
};

const DataTable = (props) => {
    const objectList = useMemo(() => createObjectList(props.data, props.visibleIDs, props.selectedLayer), [props.data, props.visibleIDs, props.selectedLayer]);
    console.log(objectList);
    const propertiesList = useMemo(() => createPropertiesList(objectList), [objectList]);
    const keyList = useMemo(() => createKeyList(propertiesList), [propertiesList]);


    return (
        objectList && propertiesList && keyList &&
        <TableContainer
            sx={{
                maxHeight: "calc(100vh - 78px)",
                overflowX: "auto",
            }}
        >
            <Table
                stickyHeader
                sx={{
                    fontSize: "100%",
                    overflowWrap: "break-word",
                }}
            >
                <TableHead sx={{ userSelect: "none", textTransform: "uppercase" }}>
                    <TableRow>
                        {keyList?.map((key) => (
                            <TableCell sx={{ maxWidth: "150px" }} key={key}>
                                {key}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {propertiesList?.map((prop) => {
                        return (
                            <TableRow
                                hover={!(prop["@id"] === props.selected)}
                                onClick={() => selecting(prop["@id"], `${prop.amenity}.json`)}
                                key={prop["@id"]}
                                sx={{ background: prop["@id"] === props.selected ? "#b1b1ff" : "#fff" }}
                            >
                                {keyList?.map((key) => (
                                    <TableCell key={key} sx={{ maxWidth: "150px" }}>
                                        {(prop[key] || "----")}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(DataTable);
