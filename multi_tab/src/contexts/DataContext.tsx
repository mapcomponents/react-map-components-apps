import React, {createContext, ReactNode} from "react";
import {useQueries} from "@tanstack/react-query";
import pwaUrl from "../lib/pwaUrl.js";

interface DataState {
    [key: string]: unknown;
}


const DataContext = createContext<DataState | undefined>(undefined);

interface DataContextProviderProps {
    children: ReactNode;
}

const geoJsonSources = ['park.json', 'restaurant.json'];

const DataContextProvider: React.FC<DataContextProviderProps> = ({children,}) => {
    const queries = useQueries({
        queries: geoJsonSources.map((source) => ({
            queryKey: ['geoJson:', source],
            queryFn: async () => {
                const res = await fetch(pwaUrl + source);
                if (!res.ok) {
                    throw new Error('Failed to fetch!');
                }
                return res.json();
            }
        }))
    })

    const allFetched = queries.every((query) => query.isSuccess);

    const data = allFetched
        ? queries.reduce((acc, query, index) => {
            acc[geoJsonSources[index]] = query.data;
            return acc;
        }, {} as DataState)
        : {};

    const value = data as DataState;

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export {DataContext, DataContextProvider};
