import { useEffect } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { useGisStore } from '../../store/useGisStore';

const M_PER_DEG_LAT = 111_320;

/** GeoJSON Feature (Polygon) approximating a circle around `latlng` in meters. */
function circlePolygonAround(latlng, radiusMeters, steps = 48) {
  const lat = latlng.lat;
  const lng = latlng.lng;
  const latRad = (lat * Math.PI) / 180;
  const cosLat = Math.max(Math.cos(latRad), 1e-6);
  const ring = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const east = radiusMeters * Math.cos(t);
    const north = radiusMeters * Math.sin(t);
    const dLat = north / M_PER_DEG_LAT;
    const dLng = east / (M_PER_DEG_LAT * cosLat);
    ring.push([lng + dLng, lat + dLat]);
  }
  return {
    type: 'Feature',
    properties: { source: 'click-select', radiusMeters },
    geometry: { type: 'Polygon', coordinates: [ring] },
  };
}

/**
 * Click the map to place a circular AOI (stored in `selectedGeometry` and drawn as GeoJSON).
 * Skips Leaflet controls and popups so toolbar/popup clicks do not move the selection.
 */
export default function ClickSelectArea({ radiusMeters = 500 }) {
  const map = useMap();
  const selectedGeometry = useGisStore((s) => s.selectedGeometry);
  const setSelectedGeometry = useGisStore((s) => s.setSelectedGeometry);
  const setSelectedAsset = useGisStore((s) => s.setSelectedAsset);

  useEffect(() => {
    const el = map.getContainer();
    const onClick = (ev) => {
      if (ev.target.closest('.leaflet-control-container')) return;
      if (ev.target.closest('.leaflet-popup')) return;
      const latlng = map.mouseEventToLatLng(ev);
      setSelectedGeometry(circlePolygonAround(latlng, radiusMeters));
      setSelectedAsset(null);
    };
    el.addEventListener('click', onClick);
    el.style.cursor = 'crosshair';
    return () => {
      el.removeEventListener('click', onClick);
      el.style.cursor = '';
    };
  }, [map, radiusMeters, setSelectedGeometry, setSelectedAsset]);

  if (!selectedGeometry) return null;

  const data =
    selectedGeometry.type === 'Feature' || selectedGeometry.type === 'FeatureCollection'
      ? selectedGeometry
      : null;
  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={{
        color: '#00f0ff',
        weight: 2,
        fillColor: '#00f0ff',
        fillOpacity: 0.2,
      }}
    />
  );
}
