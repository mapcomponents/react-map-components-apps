import React from 'react';
import ReactDOM from 'react-dom/client';
import {MapComponentsProvider} from "@mapcomponents/react-maplibre";
import App from './App';
import DataTableManager from './components/DataTableManager.jsx';
import './index.css';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DataContextProvider} from "./contexts/DataContext";
import pwaUrl from "./lib/pwaUrl";

const queryClient = new QueryClient();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(pwaUrl + 'service-worker.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MapComponentsProvider>
                <DataContextProvider>
                    <Router>
                        <Routes>
                            <Route path="*" element={<div>404 - Page Not Found</div>}/>
                            <Route path={`/table`} element={<DataTableManager/>}/>
                            <Route path={`/`} element={<App/>}/>
                        </Routes>
                    </Router>
                </DataContextProvider>
            </MapComponentsProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
