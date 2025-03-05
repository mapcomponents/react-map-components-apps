import {useEffect, useState} from 'react';
import {Feature, FeatureCollection,} from 'geojson';
import {featureCollection as createCollection} from "@turf/turf";
import {LayerSpecification} from 'maplibre-gl';
import {MlGeoJsonLayer} from "@mapcomponents/react-maplibre";
import {MlGeoJsonLayerProps} from "@mapcomponents/react-maplibre/dist/components/MlGeoJsonLayer/MlGeoJsonLayer";

export interface MlHighlightFeatureProps {
    /**
     * id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * The Feature or FeatureCollection to be highlighted by the component.
     */
    features: Feature[] | undefined;
    /**
     * Distance between the original and the highlighted Features.
     *
     * For polygon features (line and polygon inputs), a positive value results in an inset, while a negative value results in an outset.
     * For circle features (point input), negative values are not allowed; therefore, the absolute value will be used.
     * Default value: -5
     */
    offset?: number;
    /**
     * Paint properties of the config object that is passed to the MapLibreGl.addLayer call.
     * The paint properties must be compatible with the output type:
     * For polygon and line inputs ---> Line Type
     * For circle inputs ----> circle Type
     * All available properties are documented in the MapLibreGl documentation
     * https://maplibre.org/maplibre-style-spec/layers/#paint
     */

    paint?: LayerSpecification['paint'];

    insertBeforeLayer?: string;

    variant?: 'dark' | 'hell' | 'outline';
}

/**
 * It takes a Feature Array and generate a new layer with a highlight of the given Features.
 *
 */

const MlHighlightFeature = (props: MlHighlightFeatureProps) => {
    const selectedVariant = props.variant || 'outline';
    const [geojson, setGeojson] = useState<FeatureCollection>();
    const [paint, setPaint] = useState<any>();
    const [layerType, setLayerType] = useState<MlGeoJsonLayerProps['type']>('circle');

    const defaultColor = '#CCD22A';

    const variant = {
        dark: {color: '#555555', opacity: 0.5},
        outline: {color: defaultColor, lineColor: '#CCD22A', lineWidth: 6, opacity: 1},
        hell: {color: '#CCD22A', opacity: 0.8},
    };

    function getHighlightedFeature(feature: Feature) {
        const newFeature: Feature = feature;

        switch (feature.geometry.type) {
            case 'Polygon':
                if (props.variant == 'outline') {
                    setPaint({
                        'line-color': variant.outline.color,
                        'line-width': variant.outline.lineWidth,
                        'line-offset': props.offset,
                        ...props.paint,
                    });
                    setLayerType('line');
                } else {
                    setPaint({
                        'fill-color': variant[selectedVariant].color,
                        'fill-opacity': variant[selectedVariant].opacity,
                        ...props.paint,
                    });
                    setLayerType('fill');
                }
                break;

            case 'LineString':
                if (selectedVariant != 'outline') {

                    setPaint({
                        'line-color': variant[selectedVariant].color,
                        'line-opacity': variant[selectedVariant].opacity,
                        ...props.paint,
                    });

                    setLayerType('line');
                }
                break;


            case 'Point':
                if (selectedVariant == 'outline') {

                    setLayerType('circle');
                    setPaint({
                        'circle-stroke-color': variant[selectedVariant].lineColor,
                        'circle-opacity': 0,
                        'circle-stroke-width': 2,
                        'circle-radius': props.offset && Math.abs(props.offset),
                        ...props.paint,
                    });
                } else {
                    setPaint({
                        'circle-color': variant[selectedVariant].color,
                        'circle-opacity': variant[selectedVariant].opacity,
                        ...props.paint,
                    });

                    setLayerType('circle');
                }

                break;
        }
        return newFeature;
    }

    useEffect(() => {
        if (!props.features) {
            setGeojson(undefined);
            return;
        }
        const highlightedFeatures: Feature[] = [];
        props.features.forEach((feature: Feature) =>
            highlightedFeatures.push(getHighlightedFeature(feature))
        );
        setGeojson(createCollection(highlightedFeatures));
    }, [props.features]);

    return (
        <>
            {geojson && (
                <MlGeoJsonLayer
                    mapId={props.mapId}
                    geojson={geojson}
                    layerId="MlHighlightFeature"
                    type={layerType}
                    options={{paint: paint}}
                    insertBeforeLayer={props.insertBeforeLayer}
                />
            )}
        </>
    );
};

MlHighlightFeature.defaultProps = {
    mapId: undefined,
    offset: 0,
    variant: 'outlined',
};
export default MlHighlightFeature;
