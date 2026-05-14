import { create } from 'zustand';

export const useMapStore = create((set) => ({
  viewport: { center: [28.6139, 77.2090], zoom: 12 }, // New Delhi by default
  activeBaseMap: 'satellite', // 'satellite', 'dark', 'osm', 'terrain'
  drawnBounds: null, // { north, south, east, west }

  setViewport: (viewport) => set({ viewport }),
  setActiveBaseMap: (activeBaseMap) => set({ activeBaseMap }),
  setDrawnBounds: (drawnBounds) => set({ drawnBounds }),
}));
