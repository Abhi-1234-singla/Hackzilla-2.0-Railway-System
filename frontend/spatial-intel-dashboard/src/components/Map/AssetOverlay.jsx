import { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useGisStore } from '../../store/useGisStore';

/** Inset GeoJSON ring [lng,lat] from current map bounds (demo asset tracks the viewport). */
function demoPolygonRingFromBounds(bounds, insetRatio = 0.2) {
  if (!bounds) return null;
  const { north, south, east, west } = bounds;
  const latSpan = north - south;
  const lngSpan = east - west;
  const padLat = latSpan * insetRatio;
  const padLng = lngSpan * insetRatio;
  let w = west + padLng;
  let e = east - padLng;
  let s = south + padLat;
  let n = north - padLat;
  if (w >= e || s >= n) {
    const cx = (west + east) / 2;
    const cy = (south + north) / 2;
    const hw = Math.max(Math.abs(lngSpan) * 0.04, 1e-6);
    const hh = Math.max(Math.abs(latSpan) * 0.04, 1e-6);
    return [
      [cx - hw, cy - hh],
      [cx + hw, cy - hh],
      [cx + hw, cy + hh],
      [cx - hw, cy + hh],
      [cx - hw, cy - hh],
    ];
  }
  return [
    [w, s],
    [e, s],
    [e, n],
    [w, n],
    [w, s],
  ];
}

// Style mapping based on AI classification
const getAssetStyle = (feature) => {
  const type = feature.properties.type;

  const styles = {
    building: { color: '#ff3366', fillColor: '#ff3366', fillOpacity: 0.4, weight: 2 },
    water: { color: '#33ccff', fillColor: '#33ccff', fillOpacity: 0.5, weight: 1 },
    tree: { color: '#00ff66', fillColor: '#00ff66', fillOpacity: 0.4, weight: 1 },
    road: { color: '#a3a3a3', fillColor: '#a3a3a3', fillOpacity: 0.6, weight: 4 },
    railway: { color: '#ff9900', fillColor: '#ff9900', fillOpacity: 0.8, weight: 3 },
  };

  return styles[type] || { color: '#ffffff', fillOpacity: 0.2 };
};

export default function AssetOverlay() {
  const activeLayers = useGisStore((state) => state.activeLayers);
  const mapBounds = useGisStore((state) => state.mapBounds);
  const setSelectedAsset = useGisStore((state) => state.setSelectedAsset);

  // Mocked backend response: demo footprint tracks visible map bounds (replace with API payload).
  const mockAiData = useMemo(() => {
    const ring = demoPolygonRingFromBounds(mapBounds);
    const features = ring
      ? [
          {
            type: 'Feature',
            properties: {
              id: 1,
              type: 'building',
              confidence: 0.94,
              area: 'Viewport-linked (demo)',
            },
            geometry: { type: 'Polygon', coordinates: [ring] },
          },
        ]
      : [];
    return { type: 'FeatureCollection', features };
  }, [mapBounds]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({ fillOpacity: 0.8, weight: 3 });
      },
      mouseout: (e) => {
        const target = e.target;
        target.setStyle(getAssetStyle(feature));
      },
      click: () => {
        setSelectedAsset(feature.properties);
      },
    });

    layer.bindTooltip(
      `
      <div style="background: #0a0f18; color: white; padding: 8px; border: 1px solid #334155; border-radius: 4px;">
        <strong style="color: #00f0ff; text-transform: uppercase;">${feature.properties.type}</strong><br/>
        Confidence: ${(feature.properties.confidence * 100).toFixed(1)}%<br/>
        Area: ${feature.properties.area}
      </div>
    `,
      { sticky: true, className: 'custom-gis-tooltip' }
    );
  };

  const visibleFeatures = {
    ...mockAiData,
    features: mockAiData.features.filter((f) => activeLayers.includes(f.properties.type)),
  };

  return <GeoJSON data={visibleFeatures} style={getAssetStyle} onEachFeature={onEachFeature} />;
}
