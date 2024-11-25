import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import App from './App'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <MapComponentsProvider>
              <App/>
          </MapComponentsProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
