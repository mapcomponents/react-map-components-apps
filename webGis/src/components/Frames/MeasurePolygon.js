import { useState } from "react";
import { MlFeatureEditor } from "@mapcomponents/react-maplibre";

import * as turf from "@turf/turf";

function MeasurePolygon(props) {

  const [length, setLength] = useState(0);

  return (
    <>
        <MlFeatureEditor
            debug={true}
            onChange={(features) => {
                console.log(features);
                try {
                    setLength(turf.area(features[0]) / 1000000);
                } catch (e) {
                    console.log(e);
                }
            }}
            mode="custom_polygon"
        ></MlFeatureEditor>
        Area: {length.toFixed(2)} km&sup2;
    </>
  );
}

export default MeasurePolygon;
