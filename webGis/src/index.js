import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { AppContextProvider } from "./AppContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <MapComponentsProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </MapComponentsProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
