import { useState } from "react";
import { MlFeatureEditor } from "@mapcomponents/react-maplibre";

import * as turf from "@turf/turf";

function MeasureLine(props) {

  const [length, setLength] = useState(0);

  return (
    <>
        <MlFeatureEditor
            debug={true}
            onChange={(features) => {
                console.log(features);
                setLength(turf.length(features[0]));
            }}
            mode="draw_line_string"
        ></MlFeatureEditor>
        Length: {length.toFixed(2)} km
    </>
  );
}

export default MeasureLine;
