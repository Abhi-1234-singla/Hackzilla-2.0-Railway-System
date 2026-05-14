import { create } from 'zustand';

export const useGisStore = create((set) => ({
  // Map State
  mapBounds: null,
  activeBaseLayer: 'satellite',
  
  // Selection & Analysis
  selectedGeometry: null,
  isAnalyzing: false,
  
  // Layers State (ids match GeoJSON feature.properties.type)
  activeLayers: ['building', 'water', 'tree', 'railway'],
  
  // Temporal Comparison
  compareMode: false,
  timelineDates: ['2026-01-01', '2026-05-10'],
  currentDateIndex: 1,

  // Selected Asset (for right panel)
  selectedAsset: null,

  // Actions
  setMapBounds: (bounds) => set({ mapBounds: bounds }),
  setSelectedGeometry: (geo) => set({ selectedGeometry: geo }),
  toggleLayer: (layer) => set((state) => ({
    activeLayers: state.activeLayers.includes(layer)
      ? state.activeLayers.filter(l => l !== layer)
      : [...state.activeLayers, layer]
  })),
  setCompareMode: (val) => set({ compareMode: val }),
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  setCurrentDateIndex: (index) => set({ currentDateIndex: index }),
}));