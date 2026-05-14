# 🚆 AI Powered Spatial Asset Management System

A production-grade GIS surveillance and spatial intelligence platform built for Indian Railways and Urban Governance monitoring.

Inspired by:
- ArcGIS Dashboards
- Google Earth Engine
- ISRO Bhuvan
- Railway Command Centers
- Urban Infrastructure Intelligence Platforms

---

# 🌍 Features

## Core GIS Features
- Interactive satellite maps
- GIS overlays
- GeoJSON rendering
- Spatial asset monitoring
- Polygon drawing & editing
- Coordinate inspection
- Layer management
- Heatmaps
- Temporal comparison

## AI Features
- AI asset detection overlays
- Encroachment monitoring
- Waterbody analysis
- Tree cover monitoring
- Railway infrastructure intelligence
- Change detection system

## Visualization Features
- Timeline comparison
- Before vs After analysis
- Split-screen GIS comparison
- Animated overlays
- Real-time alerts
- Interactive statistics dashboard

---

# 🛠 Tech Stack

## Frontend
- React 18
- Vite
- Tailwind CSS
- React Leaflet
- Leaflet Draw
- Turf.js
- Zustand
- React Query
- Axios
- Recharts
- Framer Motion

## Backend (Suggested)
- Spring Boot / Node.js
- MongoDB + GeoJSON
- PostGIS (optional)
- Python AI services

## AI / GIS
- YOLOv8
- Detectron2
- Segment Anything Model (SAM)
- Rasterio
- GeoPandas

---

# 📂 Project Structure

src/
│
├── app/
│   ├── providers/
│   ├── router/
│   └── store/
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── styles/
│
├── components/
│   │
│   ├── layout/
│   │   ├── TopNavbar.jsx
│   │   ├── LeftSidebar.jsx
│   │   ├── RightAnalysisPanel.jsx
│   │   ├── BottomTimeline.jsx
│   │   └── FloatingControls.jsx
│   │
│   ├── map/
│   │   ├── GISMap.jsx
│   │   ├── MapToolbar.jsx
│   │   ├── LayerControl.jsx
│   │   ├── GeoJsonRenderer.jsx
│   │   ├── CoordinateInspector.jsx
│   │   ├── DrawControls.jsx
│   │   ├── HeatMapLayer.jsx
│   │   ├── CompareMapView.jsx
│   │   ├── AssetOverlay.jsx
│   │   ├── MapLegend.jsx
│   │   └── ScaleBar.jsx
│   │
│   ├── analytics/
│   │   ├── StatisticsCards.jsx
│   │   ├── DetectionSummary.jsx
│   │   ├── ConfidenceChart.jsx
│   │   ├── EncroachmentPanel.jsx
│   │   ├── AlertPanel.jsx
│   │   └── ChangeDetectionPanel.jsx
│   │
│   ├── timeline/
│   │   ├── TimelineSlider.jsx
│   │   ├── SnapshotSelector.jsx
│   │   └── CompareTimeline.jsx
│   │
│   ├── overlays/
│   │   ├── BuildingLayer.jsx
│   │   ├── RoadLayer.jsx
│   │   ├── WaterBodyLayer.jsx
│   │   ├── TreeLayer.jsx
│   │   ├── RailwayLayer.jsx
│   │   └── DrainLayer.jsx
│   │
│   ├── ui/
│   │   ├── GlassCard.jsx
│   │   ├── AnimatedButton.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ToastNotification.jsx
│   │   └── Modal.jsx
│   │
│   └── shared/
│       ├── AssetTooltip.jsx
│       ├── AssetDetailsPanel.jsx
│       ├── ErrorBoundary.jsx
│       └── EmptyState.jsx
│
├── hooks/
│   ├── useMapLayers.js
│   ├── useGeoJson.js
│   ├── useTimeline.js
│   ├── useCompareMode.js
│   ├── useAlerts.js
│   └── useHeatmaps.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── CompareAnalysis.jsx
│   ├── HistoricalView.jsx
│   ├── AlertCenter.jsx
│   └── Settings.jsx
│
├── services/
│   ├── api/
│   │   ├── axiosInstance.js
│   │   ├── analyzeApi.js
│   │   ├── assetApi.js
│   │   ├── historyApi.js
│   │   ├── compareApi.js
│   │   └── changeDetectionApi.js
│   │
│   ├── gis/
│   │   ├── geojsonParser.js
│   │   ├── turfHelpers.js
│   │   ├── mapUtils.js
│   │   └── coordinateUtils.js
│   │
│   └── export/
│       ├── exportGeoJSON.js
│       ├── exportCSV.js
│       └── exportPNG.js
│
├── store/
│   ├── useMapStore.js
│   ├── useLayerStore.js
│   ├── useTimelineStore.js
│   ├── useAlertStore.js
│   └── useAnalysisStore.js
│
├── utils/
│   ├── constants.js
│   ├── colors.js
│   ├── layerConfig.js
│   ├── geojsonHelpers.js
│   └── animationUtils.js
│
├── mock/
│   ├── mockGeojson.js
│   ├── mockAlerts.js
│   └── mockStatistics.js
│
├── App.jsx
├── main.jsx
└── index.css

---

# 🗺 GIS Workflow

## Step 1 — User Opens Map
- Load satellite imagery
- Initialize GIS layers

## Step 2 — Area Selection
User can:
- Draw polygon
- Draw rectangle
- Select existing region

## Step 3 — Capture Coordinates
Frontend captures:
```json
{
  "north": 30.7333,
  "south": 30.7000,
  "east": 76.7794,
  "west": 76.7000
}