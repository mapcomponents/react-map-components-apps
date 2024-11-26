import { createContext } from "react";
import { useState } from "react";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [featureInfoContent, setFeatureInfoContent] = useState({});
  const [featureInfoEnabled, setFeatureInfoEnabled] = useState(false);

  //state hook for top level visibility in LayerTree
  const [wmsOrGeoJSONVisible, setWmsOrGeoJSONVisible] = useState({
    "https://maps.heigit.org/histosm/wms?": false,
    "http://gis-services.metria.se/arcgis/rest/services/nv/InspireNV_NMD/MapServer/exts/InspireView/SWE/service": false,
  });

  const [includedWms, setIncludedWms] = useState([]);
  const [includedGeoJSONs, setIncludedGeoJSONs] = useState([]);

  const value = {
    featureInfoContent: featureInfoContent,
    setFeatureInfoContent: setFeatureInfoContent,
    featureInfoEnabled: featureInfoEnabled,
    setFeatureInfoEnabled: setFeatureInfoEnabled,
    wmsOrGeoJSONVisible: wmsOrGeoJSONVisible,
    setWmsOrGeoJSONVisible: setWmsOrGeoJSONVisible,
    includedWms: includedWms,
    setIncludedWms: setIncludedWms,
    includedGeoJSONs: includedGeoJSONs,
    setIncludedGeoJSONs: setIncludedGeoJSONs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppContextProvider };
