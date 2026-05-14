import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useGisStore } from '../../store/useGisStore';
import AssetOverlay from './AssetOverlay';
import ClickSelectArea from './ClickSelectArea';

// Helper to fix Leaflet icons in React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const MapEvents = () => {
  const map = useMap();
  const setMapBounds = useGisStore(state => state.setMapBounds);

  useEffect(() => {
    const pushBounds = () => {
      const bounds = map.getBounds();
      setMapBounds({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    };
    map.on('moveend', pushBounds);
    pushBounds();
    return () => {
      map.off('moveend', pushBounds);
    };
  }, [map, setMapBounds]);
  return null;
};

export default function MapView() {
  return (
    <MapContainer 
      center={[28.6139, 77.2090]} // New Delhi coordinates default
      zoom={13} 
      className="w-full h-full"
      zoomControl={false}
    >
      {/* Dark ESRI/CartoDB base map for intelligence look */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      <MapEvents />

      {/* Click map to select a circular AOI (radius in meters) */}
      <ClickSelectArea radiusMeters={500} />

      {/* AI Asset Overlays */}
      <AssetOverlay />
    </MapContainer>
  );
}