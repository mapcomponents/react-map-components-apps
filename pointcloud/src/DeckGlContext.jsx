
import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Deck } from "@deck.gl/core";

import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { MapboxLayer } from "@deck.gl/mapbox";
import { useMap } from "@mapcomponents/react-maplibre";

const DeckGlContext = React.createContext({});

export const DeckGlContextProvider = DeckGlContext.Provider;



const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});


const lightingEffect = new LightingEffect({
  ambientLight,
});

const DeckGlProvider = ({ mapId,  children }) => {
  const mapHook = useMap({ mapId });

  const [deckGl, setDeckGl] = useState(null);
  const layerRef = useState(null);

  useEffect(() => {
    if (!mapHook.map) return;

    let deck = new Deck({
      gl: mapHook.map.painter.context.gl,
      layers: [],
    });

    window.deck = deck;

    layerRef.current = new MapboxLayer({
      id: "deckgl-layer",
      deck: deck,
      effects: [lightingEffect],
    });

    mapHook.map.addLayer(layerRef.current, "poi_label");

    setDeckGl(deck);
  }, [mapHook.map]);

  const value = {
    deckGl: deckGl,
    setDeckGl: setDeckGl,
    maplibreLayer: layerRef.current,
  };

  return <DeckGlContextProvider value={value}>{children}</DeckGlContextProvider>;
};

DeckGlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeckGlProvider;
export {DeckGlContext};