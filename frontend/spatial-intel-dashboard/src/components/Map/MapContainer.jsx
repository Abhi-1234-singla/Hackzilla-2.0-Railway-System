import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';

import { useMapStore } from '../../store/useMapStore';
import { useAssetStore } from '../../store/useAssetStore';
import { analyzeArea } from '../../api/client';
import AssetOverlay from './AssetOverlay';
import MapToolbar from './MapToolbar';

// Fix Leaflet marker icons issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
window.L = L;

const DrawControl = ({ onCreated }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    
    // Ensure window.L is set before loading leaflet-draw
    window.L = L;
    
    import('leaflet-draw').then(() => {
      // Create a feature group for drawn items if it doesn't exist
      if (!map.drawnItems) {
        map.drawnItems = new L.FeatureGroup();
        map.addLayer(map.drawnItems);
      }

      // Check if control already exists
      if (map.__drawControl) {
        map.removeControl(map.__drawControl);
      }

      const drawControl = new L.Control.Draw({
        position: 'topright',
        edit: {
          featureGroup: map.drawnItems
        },
        draw: {
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polygon: {
            allowIntersection: false,
            shapeOptions: { color: '#00ffff' }
          },
          rectangle: {
            shapeOptions: { color: '#00ffff' }
          }
        }
      });

      map.addControl(drawControl);
      map.__drawControl = drawControl;

      const handleCreated = (e) => {
        map.drawnItems.addLayer(e.layer);
        if (onCreated) onCreated(e);
      };

      map.on(L.Draw.Event.CREATED, handleCreated);

      return () => {
        if (map.__drawControl) {
          map.removeControl(map.__drawControl);
          map.__drawControl = null;
        }
        map.off(L.Draw.Event.CREATED, handleCreated);
      };
    }).catch(err => {
      console.error("Failed to load leaflet-draw:", err);
    });
  }, [map, onCreated]);

  return null;
};

const MapUpdater = () => {
  const { viewport } = useMapStore();
  const map = useMap();

  useEffect(() => {
    map.setView(viewport.center, viewport.zoom);
  }, [viewport.center, viewport.zoom, map]);

  return null;
};

const BaseMaps = () => {
  const { activeBaseMap } = useMapStore();

  const getTileUrl = () => {
    switch (activeBaseMap) {
      case 'dark':
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        // Using a reliable terrain map URL as Stamen requires API keys now
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}';
      case 'osm':
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  return <TileLayer url={getTileUrl()} maxZoom={20} attribution='&copy; OpenStreetMap contributors' />;
};

const MapView = () => {
  const { viewport, setDrawnBounds } = useMapStore();
  const { setAssets, setLoading } = useAssetStore();

  const _onCreated = async (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon' || layerType === 'rectangle') {
      const bounds = layer.getBounds();
      const payload = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      };
      setDrawnBounds(payload);
      
      // Trigger AI Analysis
      setLoading(true);
      try {
        const result = await analyzeArea(payload);
        setAssets(result);
      } catch (error) {
        console.error("Error analyzing area:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900">
      <LeafletMap 
        center={viewport.center} 
        zoom={viewport.zoom} 
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <MapUpdater />
        <BaseMaps />
        
        <DrawControl onCreated={_onCreated} />

        <AssetOverlay />
        <ZoomControl position="bottomright" />
      </LeafletMap>
      <MapToolbar />
    </div>
  );
};

export default MapView;