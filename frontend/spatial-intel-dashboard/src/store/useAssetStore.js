import { create } from 'zustand';

export const useAssetStore = create((set) => ({
  assets: null, // GeoJSON FeatureCollection
  selectedAsset: null, // Specific feature details
  isLoading: false,
  error: null,
  activeLayers: {
    Buildings: true,
    Water: true,
    Trees: true,
    Roads: true,
    Drains: true,
    Railway: true,
  },

  setAssets: (assets) => set({ assets }),
  setSelectedAsset: (selectedAsset) => set({ selectedAsset }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  toggleLayer: (layerName) =>
    set((state) => ({
      activeLayers: {
        ...state.activeLayers,
        [layerName]: !state.activeLayers[layerName],
      },
    })),
  setAllLayers: (status) =>
    set((state) => {
      const newLayers = { ...state.activeLayers };
      Object.keys(newLayers).forEach(key => {
        newLayers[key] = status;
      });
      return { activeLayers: newLayers };
    }),
}));
