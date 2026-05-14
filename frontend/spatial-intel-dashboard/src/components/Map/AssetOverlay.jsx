import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { useAssetStore } from '../../store/useAssetStore';
import { useTimeStore } from '../../store/useTimeStore';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import AssetTooltip from './AssetTooltip';

const COLOR_SCHEME = {
  Buildings: '#ef4444', // Red
  Water: '#3b82f6',     // Blue
  Trees: '#22c55e',     // Green
  Roads: '#9ca3af',     // Gray
  Drains: '#eab308',    // Yellow
  Railway: '#f97316',   // Orange
};

const COMPARE_COLORS = {
  added: '#22c55e',     // Green
  removed: '#ef4444',   // Red
  unchanged: '#6b7280', // Gray
};

const AssetOverlay = () => {
  const { assets, activeLayers, setSelectedAsset } = useAssetStore();
  const { compareMode } = useTimeStore();

  if (!assets || !assets.features) return null;

  // Filter features based on active layers
  const filteredFeatures = assets.features.filter(
    (feature) => activeLayers[feature.properties.assetType]
  );

  const styleFeature = (feature) => {
    let color = COLOR_SCHEME[feature.properties.assetType] || '#ffffff';
    let weight = 2;
    let fillOpacity = 0.4;

    if (compareMode && feature.properties.status) {
      color = COMPARE_COLORS[feature.properties.status] || color;
      if (feature.properties.status === 'unchanged') {
        fillOpacity = 0.1;
      }
    }

    return {
      color: color,
      weight: weight,
      opacity: 0.8,
      fillOpacity: fillOpacity,
      className: 'transition-all duration-300 ease-in-out hover:fill-opacity-80'
    };
  };

  const onEachFeature = (feature, layer) => {
    // Tooltip
    const tooltipContent = renderToStaticMarkup(<AssetTooltip feature={feature} />);
    layer.bindTooltip(tooltipContent, {
      sticky: true,
      className: 'custom-tooltip',
      opacity: 1
    });

    // Click handler
    layer.on({
      click: (e) => {
        // Stop event from propagating to map
        L.DomEvent.stopPropagation(e);
        setSelectedAsset(feature);
      },
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 4,
          fillOpacity: 0.7
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(styleFeature(feature));
      }
    });
  };

  return (
    <GeoJSON
      key={`geojson-${Date.now()}-${compareMode}`} // Force re-render on toggle
      data={{ type: 'FeatureCollection', features: filteredFeatures }}
      style={styleFeature}
      onEachFeature={onEachFeature}
    />
  );
};

export default AssetOverlay;
